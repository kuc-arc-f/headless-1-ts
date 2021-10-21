import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import LayoutAdmin from '../../components/LayoutAdmin'
import NaviAdmin from '../../components/NaviAdmin'
import EditRow from '../../components/content/EditRow'
import Footer from '../../components/Footer'
import LibContent from '../../libs/LibContent'
//
interface IState {
  name: string,
  content: string,
  _token: string,
}
interface IProps {
  user_id: string,
  site_id: string,
  content_id: string,
  csrf: any,
  columns: any,
  content_name: string,
  content: any,
}
export default class ContentEdit extends Component<IProps, IState> {
  static async getInitialProps(ctx) {
// console.log("query=", ctx.query )
    const id = ctx.query.id
    const site_id = ctx.query.site_id
    const content_name = ctx.query.content_name
    const url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    let url_show = '/api/content/show?site_id=' + site_id + '&content_name='+content_name
    url_show += "&id=" + id
// console.log( url_show )
    const resContent = await fetch(process.env.BASE_URL + url_show)
    const jsonContent = await resContent.json() 
//console.log(  jsonContent )    
    const column_id = jsonContent.item.column_id
    const resColmun = await fetch(process.env.BASE_URL +'/api/columns/show?id=' + column_id)
    const jsonColmun = await resColmun.json()  
    const columns = JSON.parse(jsonColmun.item.values || '[]')  
//console.log(  jsonColmun.item.name )    
    return { 
      user_id :cookies(ctx).user_id,
      site_id :cookies(ctx).site_id,
      csrf: json.csrf,
      content_id: id,
      columns: columns,
      content: jsonContent.item,
      content_name: jsonColmun.item.name
    }
  }  
  constructor(props){
    super(props)
    this.state = {name: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
//console.log(props.content )
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  } 
  handleClick(){
    console.log("#handleClick")
    this.add_item()
  } 
  async handleClickDelete(){
    console.log( "content_id=", this.props.content_id)
    try {
      const content_name = this.props.content_name
      const item = {
        content_name: content_name,
        id: this.props.content_id,
        site_id: this.props.site_id,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL +'/api/content/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        alert("Complete, delete")
        const content_id = this.props.content_id
        const url  = `/content/list?site_id=${this.props.site_id}&column=${content_id}`
        Router.push(url);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  }
  //
  add_item(){
    try {
      const columns = this.props.columns;
      const myForm = document.querySelector<HTMLFormElement>('#myForm');
      const formData = new FormData(myForm); 
      const elem = []
      columns.map((item, index) => {
//console.log(item.name)
        if(item.name != ""){
          let value = formData.get( item.name )
          let row = {
            name: item.name ,
            value: value,
          }          
          elem.push(row)
        }
      })      
      const json= JSON.stringify( elem );
// console.log(json)
      const elemJson = document.querySelector<HTMLInputElement>('#colmuns_json');
      elemJson.value = json
      myForm.submit()
// console.log(item)
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
    const columns = this.props.columns
    const site_id = this.props.site_id
    const content_name = this.props.content_name
    const contentObj = this.props.content.values
// console.log(contentObj)
    return (
    <LayoutAdmin>
      <NaviAdmin  site_name={""} site_id={site_id} />
      <div className="container">
        <form action="/api/content/update" method="post" id="myForm" name="myForm">
          <input type="hidden" id="colmuns_json" name="colmuns_json" />
          <input type="hidden" id="site_id" name="site_id" value={site_id}/> 
          <input type="hidden" id="id" name="id" value={this.props.content_id}/> 
          <input type="hidden" id="content_name" name="content_name" value={content_name}/> 
          <Link href={`/content/list?site_id=${site_id}`}>
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <div className="row">
            <div className="col-sm-6">
            <h3>{content_name} - Edit</h3>
            </div>
            <div className="col-sm-6">
              <button className="btn btn-primary" onClick={this.handleClick}>Save
              </button>
            </div>
          </div>
          <hr className="mt-2 mb-2" />          
          {columns.map((item, index) => {
            let contentValue = LibContent.get_item(contentObj , item.name)
// console.log(contentValue )
            if(item.name != ""){
//console.log(content[item.name])
              return (<EditRow key={index} name={item.name} 
                type={item.type} value={contentValue} />
              )
            }
          })}  
        </form>
        <hr />                
        <div className="form-group">
          <button className="btn btn-danger" onClick={this.handleClickDelete}>Delete
          </button>
        </div>
      </div>
      <Footer />
    </LayoutAdmin>
    )    
  } 
}

