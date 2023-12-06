import { UserProvider } from '@auth0/nextjs-auth0/client';
import { RecipeProvider } from '../components/context/recipeContext';
import '../styles/globals.css';
import NavBar from '../components/navigation/navbar';
import { ThemeProvider } from '../components/ui-utils/themeContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <RecipeProvider>
            <NavBar className="h-3" />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} className="mt-4" />
          </RecipeProvider>
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
