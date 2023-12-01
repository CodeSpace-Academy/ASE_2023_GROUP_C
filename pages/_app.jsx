import { UserProvider } from '@auth0/nextjs-auth0/client';
import { RecipeProvider } from '../components/context/recipeContext';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import NavBar from '../components/navigation/navbar';
import { ThemeProvider } from '../components/ui-utils/themeContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>

      <ThemeProvider>
        <div>
          <RecipeProvider>
            <NavBar />
            <Layout />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </RecipeProvider>
        </div>
      </ThemeProvider>

    </UserProvider>
  );
}

export default MyApp;
