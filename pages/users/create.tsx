import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import Layout from '../../components/layout'
//
interface IState {
  name: string,
  mail: string,
  password: string, 
  _token: string,
}
interface IProps {
  csrf: any,
  flash: any,
  count: number,
}
export default class UserCreate extends Component<IProps, IState> {
  static async getInitialProps(ctx) {
    const url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    const url_count = process.env.BASE_URL + '/api/users/users_count'
    const resCount = await fetch(url_count)
    const jsonCount = await resCount.json()
//console.log(jsonCount.count )
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      count: jsonCount.count,
    }
  }  
  constructor(props){
    super(props)
    this.state = {
      name: '',
      mail: '',
      password: '',
      _token: '',
    };
    this.handleChange = this.handleChange.bind(this);    
    this.handleClick = this.handleClick.bind(this);
// console.log(this.props.count)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
    /*
    if(Number(this.props.count) > 0){
      flash.set({ messages_error: 'Error, admin user max 1' })
      Router.push('/login');
    }
    */
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      const item = {
        mail: this.state.mail,
        password: this.state.password,
        name: this.state.name,
        _token: this.state._token
      }
//console.log(item)
        const res = await fetch('/api/users/new', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
//        var json = await res.json()
// console.log( json )
        alert("Success, User add")
        flash.set({ messages_success: 'Complete user add, please Login' })
        Router.push('/login');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }    
  }
  handleChange(event) {
//    console.log(event.target.name )
    const value = event.target.value;
    if(event.target.name ==='mail' ){
        this.setState({mail: value });
    }
    if(event.target.name ==='name' ){
      this.setState({name: value });
  }
  if(event.target.name ==='password' ){
      this.setState({password: value });
    }    
  }   
  render() {
    return (
    <Layout>
      <div className="container">
        <hr className="mt-2 mb-2" />
        <h1>User - Create</h1>
        <div className="col-sm-6">
          <div className="form-group">
              <label>mail:</label>
              <input name="mail" type="text" className="form-control"
              value={this.state.mail}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
              <label>Name:</label>
              <input name="name" type="text" className="form-control"
              value={this.state.name}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>        
        <div className="col-sm-6">
          <div className="form-group">
              <label>password:</label>
              <input name="password" type="password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>save
          </button>
        </div>
      </div>
    </Layout>
    )    
  } 
}