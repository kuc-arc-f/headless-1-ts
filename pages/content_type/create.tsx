import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import LayoutAdmin from '../../components/LayoutAdmin'
import NaviColumns from '../../components/NaviColumns'
import Footer from '../../components/Footer'

import LibContentType from '../../libs/LibContentType'
import InputRow from './InputRow'

interface IState {
  name: string,
  content: string,
  _token: string,
  form_item_arr: any,
}
interface IProps {
  user_id: string,
  csrf: any,
  site_id: string,
  colmuns: any,
}
//
export default class Create extends Component<IProps, IState> {
  static async getInitialProps(ctx) {
//console.log(ctx.query.site_id )
    const site_id = ctx.query.site_id
    const url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ site_id)
    const jsonColumn = await resColumn.json()        
//console.log(jsonColumn.items)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      site_id: ctx.query.site_id,
      colmuns: jsonColumn.items,
    }
  }  
  constructor(props){
    super(props)
    this.state = {name: '', content: '', _token : '', form_item_arr:null}
    this.handleClick = this.handleClick.bind(this);
// console.log(props)
  }
  componentDidMount(){
//console.log(this.props.colmuns)
    const arr = []
    for(let i= 0;i < 10; i++){
      let item = {  index : i }
      arr.push(item)
    }
    this.setState({ _token: this.props.csrf.token,
      form_item_arr: arr 
    });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }   
  handleChangeTitle(e){
    this.setState({name: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      const myForm = document.querySelector<HTMLFormElement>('#myForm');
      const formData = new FormData(myForm); 
      let valid = LibContentType.valid_form(formData)
      if(valid === false){ throw new Error('Invalid , valid_form'); }
        valid = LibContentType.validContentName(
          this.props.colmuns, formData.get( "content_name" )
        )
//  console.log(valid)
      if(valid==false){ throw new Error('Invalid , valid_form'); }
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
      const json= JSON.stringify( elem );
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
    if(this.state.form_item_arr instanceof Array){
      return this.state.form_item_arr.map((item, index) => {
// console.log(item.index)
        return (<InputRow key={index} index={item.index} 
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
          <h3>Content - Create</h3>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary" onClick={this.handleClick}>Save
            </button>
          </div>
        </div>
        <hr className="mt-2 mb-2" />
        <form action="/api/columns/new" method="post" id="myForm" name="myForm">
          <input type="hidden" id="colmuns_json" name="colmuns_json" />
          <input type="hidden" id="site_id" name="site_id" value={this.props.site_id}/>          
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Content Name:</label>
              <input type="text" name="content_name"
              className="form-control"
                />
              <span className="mt-0"><br />*) 半角英数、アンダースコア( _ )が入力可能です。</span>
            </div>
          </div>
          <hr className="mt-0 mb-0" />
          <h3>Column Setting :</h3>
          <hr />
          {this.tabRow()}
        </form>
        <div className="form-group">
        </div>                
      </div>
      <Footer />
    </LayoutAdmin>
    )    
  } 
}

