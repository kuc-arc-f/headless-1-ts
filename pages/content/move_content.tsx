import React, {Component} from 'react';
import Layout from '../../components/layout'
//
interface IProps {
  query: any,
}

export default class Test extends Component<IProps> {
  static async getInitialProps(ctx){
//console.log(ctx.query )
    const query = ctx.query;
    return { 
      query: ctx.query,
    }
  }  
  constructor(props){
    super(props)
  }
  componentDidMount(){
console.log(this.props.query );
    const query = this.props.query;
    let url_column = `/content/list?site_id=${query.site_id}&column=${query.column}`;
    console.log(url_column);
    location.href = url_column;
  }   
  render() {
    return (
      <Layout>
        <div className ="container">
          <hr className="mt-2 mb-2" />
          <p>wait page...</p>
        </div>
      </Layout>
    )    
  } 
}
