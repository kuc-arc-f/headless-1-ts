import Head from 'next/head';
import NaviAdmin from './NaviAdmin';
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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        ></Script>            
      {children}
    </div>
  )
}
export default Layout
