import Link from 'next/link';
import Head from 'next/head';
//
export default function Navibar(){
  return (
  <nav className="navbar navbar-expand-md navbar-light bg-light">
    <div className="container-fluid">
      <Link href="/"><a className="navbar-brand"></a>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {/*
        */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link active">[ Home ]</a>
            </Link>                    
          </li>
          <li className="nav-item active">
            <Link href="/sites" >
              <a className="nav-link active ml-2">[ Site ] 
              </a>
            </Link>                    
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link href="/login">
              <a className="nav-link active ml-2">Login </a>
            </Link>                    
          </li>
          <li className="nav-item active">
            <Link href="/about">
              <a className="nav-link active ml-2">About </a> 
            </Link>                    
          </li>
        </ul>            
      </div>
    </div>
  </nav>
  );
}
