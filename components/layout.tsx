import Head from 'next/head';
import Navibar from './Navibar';
import Footer from './Footer';
import LibConst from '../libs/LibConst';
import Script from 'next/script'
//
function Layout({ children }) {
  const sys_name = LibConst.get_config().SYS_NAME
  return (
    <div>
      <Head>
        <title key="title">{sys_name}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
      ></Script>      
      <Navibar />
      {children}
      <Footer />
    </div>
  )
}
export default Layout
