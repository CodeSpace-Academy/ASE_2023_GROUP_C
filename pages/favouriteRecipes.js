import FavouriteRecipes from "../components/favourite/favouriteRecipes";
import NoFavouritesYet from '../components/favourite/no-favourites';
import CustomPrompt from '../components/custom-prompt/prompt';

export default function Favorites() {
  return(
    <div>
  
  <FavouriteRecipes />
  <NoFavouritesYet />
  <CustomPrompt />
    </div>
  )
}


