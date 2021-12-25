import Link from 'next/link';
import Head from 'next/head';
import React from 'react';

interface IState {
  value: string,
}
interface IProps {
  name: string,
  type: string,
  value: string,
}
//
export default class EditRow extends React.Component<IProps, IState> {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: '' }
// console.log(props )
  }
  componentDidMount(){
    this.setState({value: this.props.value });
  }  
  handleChange(event) {
    //    console.log(event.target.name )
    const value = event.target.value;
    this.setState({value: value });
  }  
  render(){
    return (
    <div>
      <div className="d1">
        {(this.props.type ==="1")? (
          <div className="form-group">
            <label>{this.props.name} :</label>
            <input type="text" name={this.props.name} value={this.state.value}
              className="form-control" onChange={this.handleChange.bind(this)} />          
          </div>
        ) : ""
        }
        {(this.props.type ==="2")? (
          <div className="form-group">
            <label>{this.props.name} :</label>
            <textarea name={this.props.name} value={this.state.value}
              onChange={this.handleChange.bind(this)} className="form-control"
             rows={8}></textarea>
          </div>
        ) : ""
        }
        {(this.props.type ==="3")? (
          <div className="form-group">
            <label>{this.props.name} :</label>
            <input type="number" name={this.props.name} value={this.state.value}
              onChange={this.handleChange.bind(this)} className="form-control"
             ></input>
          </div>
        ) : ""
        }
      </div>    
    </div>
    );
  }
}
