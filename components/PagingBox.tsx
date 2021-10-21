import Link from 'next/link';
import Head from 'next/head';
import React from 'react'

interface IProps {
  parent_func: any,
  paginateDisp: number,
  page: number,
  site_id: string,
  column_id: string,
}
//
export default class PagingBox extends React.Component<IProps> {
  constructor(props){
    super(props)
  }
  clickHandler(page){
    this.props.parent_func(page);
  }  
  render(){
    const paginateDisp = this.props.paginateDisp
    const nextPage = Number(this.props.page) + 1
// console.log("nextPage=" , nextPage)
    return (
      <div>
        { paginateDisp ? (
        <div className="paginate_wrap">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.clickHandler.bind(this, 1)}
              className="btn btn-lg btn-outline-primary"> 1st
            </button>
            <button onClick={this.clickHandler.bind(this, nextPage)}
              className="btn btn-lg btn-outline-primary"> next
            </button>
          </div>
        </div>
        ):"" 
        }    
      </div>
      )
  }
}
