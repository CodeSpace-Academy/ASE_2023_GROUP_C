
import Layout from '../components/layout/layout'
import '../styles/globals.css'; // Import your global styles


function MyApp({ Component, pageProps }) {
  return (
 
    <div className='bg-white'>
      <Layout />
      <Component { ...pageProps} />
      
    </div>
  
  );
}

export default MyApp;
