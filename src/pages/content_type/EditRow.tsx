import Link from 'next/link';
import Head from 'next/head';
import React from 'react';

interface IState {
  name: string,
  type: string,
}
interface IProps {
  index: number,
  name: string,
  type: string,
}
//
export default class EditRow extends React.Component<IProps, IState> {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.state = {name:'' , type:''}
//console.log(props )
  }  
//console.log(props.index)
  componentDidMount(){
    this.setState({
      //value: this.props.value , 
      name: this.props.name ,
      type: this.props.type,
    });
  }  
  handleChange(event) {
//console.log(event.target.name )
    const value = event.target.value;
    this.setState({name: value });
  }
  handleChangeType(event){
    console.log(event.target.name )
    const value = event.target.value;
    this.setState({ type: value });
  }
  render(){
    const index = this.props.index
    const nameNo = index + 1
    const col_name = `colmun[${index}]name`
    const col_type = `colmun[${index}]type`
    return (
    <div className="row">
      <div className="col-md-6 form-group">
        <label>Name{nameNo}:</label>
          <input type="text" id={col_name} name={col_name} value={this.state.name}
          className="form-control" onChange={this.handleChange.bind(this)} />
      </div>
      <div className="col-md-6 form-group">
        <label>Type{nameNo}:</label>
        <select id={col_type} name={col_type} value={this.state.type}
        className="form-control" onChange={this.handleChangeType.bind(this)}>
          <option value="0">Select please</option>
          <option value="1">Text</option>
          <option value="2">Text Area</option>
          <option value="3">Number</option>
        </select>              
      </div>
    </div>
    );
  }
}

