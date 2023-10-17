
import Layout from '../components/layout/layout'
import '../styles/globals.css'; // Import your global styles
import {UserProvider} from '@auth0/nextjs-auth0/client'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className='bg-white'>
        <Layout />
        <Component { ...pageProps} />  
      </div>
    </UserProvider>
  );
}

export default MyApp;
