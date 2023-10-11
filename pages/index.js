import MainNavigation from '../components/layout/main-navigation'; // Import the MainNavigation component
import RecipeList from './recipe-list/index';

export default function HomePage() {
  return (
    <div>
      <MainNavigation /> {/* Display the navigation bar */}
      <RecipeList />
    </div>
  );
}
