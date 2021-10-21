import Head from 'next/head'
import React from 'react'
import Router from 'next/router'
import Link from 'next/link';
import flash from 'next-flash';

import Layout from '../../../components/layout'

interface IState {
  url: string,
}
interface IProps {
  url: string,
  webhook_url: string,
  site_id: string,
  item: any,
}
//
export default class SiteSetting extends React.Component<IProps, IState> {
  static async getInitialProps(ctx){
    console.log(ctx.query.id)
    const id = ctx.query.id
    const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
    const json = await res.json()
    const resSetting = await fetch(process.env.BASE_URL +'/api/sites/setting_get?id=' + id)
    const jsonSetting = await resSetting.json()
// console.log(jsonSetting.item)
    let webhook_url = ""
    if(jsonSetting.item != null){
      webhook_url = jsonSetting.item.webhook_url
    }
    return {
      site_id: id,
      item: json.item ,
      webhook_url: webhook_url, 
      contents :[] 
    }
  }
  constructor(props){
    super(props)
    this.state = { url: this.props.webhook_url }
// console.log(props)
  }
  async add_item(){
    try {
      const item = {
        site_id: this.props.site_id,
        url: this.state.url,
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/sites/setting_save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
//        const json = await res.json()
//        alert("Success, save URL")
        flash.set({ messages_success: 'Success, save URL' })
//console.log(json)
        Router.push('/sites');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  }     
  handleClick(){
    this.add_item()
  }
  handleChange(e){
    this.setState({url: e.target.value})
  }
  //setting_save
  render(){
//    console.log(data.item._id )
    const site_id= this.props.item._id
    const item = this.props.item
    return (
    <Layout>
      <div className="container">
        
        <Link href="/sites">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr />
        <div><h1>Site Setting</h1>
        </div>
        <div><p>Site : {item.name}</p>
        </div>
        <hr />    
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label>webhook URL:</label>
              <p>* netlify webhook 起動するURLを入力下さい。</p>
              <input type="text" className="form-control" name="url"
              value={this.state.url}
              onChange={this.handleChange.bind(this)} 
              placeholder="https://api.netlify.com/build_hooks/1234" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary"
           onClick={this.handleClick.bind(this)}>Save
          </button>
        </div>        

      </div>
    </Layout>
    )  
  }
}

