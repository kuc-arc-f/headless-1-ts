import Link from 'next/link';
import Head from 'next/head';
//
export default function Navibar(){
  return (
  <nav className="navbar navbar-expand-md navbar-light bg-light">
    <Link href="/"><a className="navbar-brand"> </a>
    </Link> 
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link href="/">
            <a className="ml-2 nav-link"> <i className="fas fa-home"></i> Home </a>
          </Link>                    
        </li>
        <li className="nav-item active">
          <Link href="/sites" >
            <a className="nav-link ml-2"><i className="fas fa-check"></i> Site 
            </a>
          </Link>                    
        </li>
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href="/login">
            <a><i className="nav-link fas fa-sign-in-alt"></i> Login </a>
          </Link>                    
        </li>
        <li className="nav-item">
          <Link href="/about">
            <a><i className="nav-link fas fa-info ml-2"></i> About </a> 
          </Link>                    
        </li>
      </ul>            
    </div>
  </nav>
  );
}
