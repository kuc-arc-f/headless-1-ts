import Link from 'next/link';
import Head from 'next/head';
//
export default function Page(props){
// console.log(props.site_name )
  return (
  <nav className="navbar navbar-expand-md navbar-light bg-light">
    <Link href="/" > 
      <a className="navbar-brand"> </a>
    </Link> 
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link href="/">
            <a className="nav-link ml-2"><i className="fas fa-home"></i> Home </a>
          </Link>                    
        </li>
        <li className="nav-item active">
          <Link href="/sites">
            <a className="nav-link ml-2"><i className="fas fa-check"></i> Site </a>
          </Link>                    
        </li>
        <li className="nav-item active">
          <Link href={`/content_type/${props.site_id}`}>
            <a className="nav-link ml-2"><i className="fas fa-check"></i> ContentType </a>  
          </Link>                    
        </li>
        <li className="nav-item active">
          <Link href={`/content/list?site_id=${props.site_id}`} >
            <a className="nav-link ml-2 btn btn-sm btn-outline-primary">Site: {props.site_name}</a>  
          </Link>                    
        </li>
      </ul>
    </div>
  </nav>
  );
}
