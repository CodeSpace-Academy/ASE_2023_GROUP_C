/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { getRecipeDetails, getAllergens, getFavouriteRecipes } from '../../utils/mongodb-utils';
import RecipeCard from '../../components/recipeCard/recipeCard';

export async function getServerSideProps(context) {
  const recipeId = context.query.recipeDetails;

  let recipeDocuments;
  let allergens;

  const favouriteRecipes = await getFavouriteRecipes(
    'users-list',
    { userName: 'The User 1' },
  );
  // An array of a favourite recipes
  const usersFavouriteLists = favouriteRecipes.userList;
  // Creating a set of recipe Id.
  // eslint-disable-next-line no-underscore-dangle
  const favouriteRecipeIds = new Set(usersFavouriteLists.map((recipe) => recipe._id));

  // If the recipe ID in context is avaible in the favourite then that
  // recipe should be returned.
  if (favouriteRecipeIds.has(recipeId)) {
    recipeDocuments = usersFavouriteLists.find((favRecipe) => favRecipe._id === recipeId);

    allergens = await getAllergens('allergens');

    const allergensList = allergens[0].allergens;

    return { props: { recipeDocuments, allergensList } };
  }
  try {
    recipeDocuments = await getRecipeDetails('recipes', {
      _id: recipeId,
    });
    allergens = await getAllergens('allergens');

    const allergensList = allergens[0].allergens;

    return { props: { recipeDocuments, allergensList } };
  } catch (error) {
    console.error('Getting recipes failed');
    return {
      notFound: true,
    };
  }
}

export default function RecipeDetails({ recipeDocuments, allergensList }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex font-bold p-5  bg-slate-900 text-white items-center">
        <button type="button" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
        </button>
        <h1 className=" text-center font-bold p-5 text-xl bg-slate-900 text-white">RecipeDetails</h1>
      </div>
      <RecipeCard recipe={recipeDocuments} allergensList={allergensList} />
    </div>
  );
}