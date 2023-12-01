import { UserProvider } from "@auth0/nextjs-auth0/client";
import { RecipeProvider } from "../components/context/recipeContext";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import NavBar from "../components/navigation/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className='bg-slate-900'>
        <RecipeProvider>
          <NavBar />
          <div className='mt-12'>
            {" "}
            {/* Add margin-top to create space */}
            <Layout />
            <Component {...pageProps} />
          </div>
        </RecipeProvider>
      </div>
    </UserProvider>
  );
}

export default MyApp;
