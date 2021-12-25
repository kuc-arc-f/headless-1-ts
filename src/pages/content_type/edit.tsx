import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import LayoutAdmin from '@/components/LayoutAdmin'
import NaviColumns from '@/components/NaviColumns'
import Footer from '@/components/Footer'

//import LibContentType from '../../libs/LibContentType'
import EditRow from './EditRow'

interface IState {
  name: string,
  content: string,
  _token: string,
  columns: any,
  form_item_arr: any,
  content_name: string,
}
interface IProps {
  user_id: string,
  csrf: any,
  site_id: string,
  columns: any,
  colmun_item: any,
  column_id: string,
}
//
export default class Edit extends Component<IProps, IState> {
  static async getInitialProps(ctx) {
console.log("q=", ctx.query)
    const column_id = ctx.query.content_type_id
    const url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    const resColmun = await fetch(process.env.BASE_URL +'/api/columns/show?id=' + column_id)
    const jsonColmun = await resColmun.json() 
    const columns = JSON.parse(jsonColmun.item.values || '[]') 
//console.log( columns )
    return { 
      user_id :cookies(ctx).user_id,
      column_id: column_id,
      csrf: json.csrf,
      site_id :cookies(ctx).site_id,
      columns: columns,
      colmun_item: jsonColmun.item,
    }
  }  
  constructor(props){
    super(props)
    this.state = {
      name: '', content: '', _token : '', form_item_arr:null,
      content_name: '', columns: ''
    }
    this.handleClick = this.handleClick.bind(this);
//console.log(props)
  }
  componentDidMount(){
//console.log( this.props.columns )
    const arr = []
    for(let i= 0;i < 10; i++){
      let item = {  index : i }
      arr.push(item)
    }
    this.setState({ _token: this.props.csrf.token,
      form_item_arr: arr, content_name: this.props.colmun_item.name, 
      columns: this.props.columns
    });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      const myForm = document.querySelector<HTMLFormElement>('#myForm');
      const formData = new FormData(myForm); 
      //var valid = LibContentType.valid_form(formData)
//      if(valid==false){ throw new Error('Invalid , valid_form'); }
//console.log(valid)
      const elem = []
      for(let i= 0; i< 10; i++){
        let inputName = "colmun["+i+"]name"
        let inputType = "colmun["+i+"]type"
        let name = formData.get( inputName )
        let type = formData.get( inputType )        
        let item = {
          name: name,
          type: type,
        }
        elem.push(item)
//console.log(name, i)
      }
      const json = JSON.stringify( elem );
//console.log(json)
      const elemJson = document.querySelector<HTMLInputElement>('#colmuns_json');
      elemJson.value = json
      myForm.submit()
// console.log(item)
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  } 
  tabRow(){
    if(this.state.columns instanceof Array){
      return this.state.columns.map((item, index) => {
//console.log(item )
        return (<EditRow key={index} index={index} 
          name={ item.name} type={item.type}
                />
        )        
      })
    }
  }
  render() {
//console.log(this.props.site_id)
    return (
    <LayoutAdmin>
      <NaviColumns  site_name={""} site_id={this.props.site_id} />
      <div className="container">
        <Link href={`/content_type/${this.props.site_id}`}>
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr className="mt-2 mb-2" />
        <div className="row">
          <div className="col-sm-6">
            <h3>Content - Edit</h3>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary" onClick={this.handleClick}>Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form-group mb-0">
            <label>Content Name : {this.state.content_name}</label>
          </div>
        </div>
        <hr className="mt-2 mb-2" />
        <form action="/api/columns/update" method="post" id="myForm" name="myForm">
        <input type="hidden" id="colmuns_json" name="colmuns_json" />
        <input type="hidden" id="site_id" name="site_id" value={this.props.site_id}/>  
        <input type="hidden" id="id" name="id" value={this.props.column_id}/>  
          <h3>Column Setting :</h3>
          <hr />
          {this.tabRow()}
        </form>
      </div>
      <Footer />
    </LayoutAdmin>
    )    
  } 
}

