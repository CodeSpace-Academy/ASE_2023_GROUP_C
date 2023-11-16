import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function FavouriteRecipes({ children }) {
  return (
    <div>
      <Link href="/recipeList/recipeList">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="xl"
          className="text-white p-2"
        />
      </Link>

      <h1 className="text-white p-2">Your Favorite Recipes</h1>
      <button type="button">Remove favourite</button>
      <div>{children}</div>
    </div>
  );
}
