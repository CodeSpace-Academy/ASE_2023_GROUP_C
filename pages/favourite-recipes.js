
import { Fragment } from 'react'
import FavouriteRecipes from '../components/favourite/favourite-recipes'
import NoFavouritesYet from '../components/favourites/no-favourites'
import CustomPrompt from '../components/custom-prompt/prompt'

export default function Favorites() {
  return (
    <Fragment>
      <FavouriteRecipes />
      <NoFavouritesYet />
      <CustomPrompt />
    </Fragment>
    
  )
}
