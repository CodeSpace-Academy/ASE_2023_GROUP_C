import { UserProvider } from '@auth0/nextjs-auth0/client';
import { RecipeProvider } from '../components/context/recipeContext';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className=" bg-slate-900 ">
        <RecipeProvider>
          <Layout />
          <Component {...pageProps} />
        </RecipeProvider>

      </div>
    </UserProvider>
  );
}

export default MyApp;
