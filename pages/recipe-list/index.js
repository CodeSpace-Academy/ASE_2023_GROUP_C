// pages/RecipeList.js

// import Image from "next/image";
import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";



export async function getStaticProps() {
  let client = await connectToDb();
  const recipeDocuments = await getAllRecipes(
    client,
    "recipes",
    { _id: -1 },
    1
  );

  return {
    props: {
      recipes: recipeDocuments,
    },
  };
}

import React from 'react'
import RecipeList from "../../components/recipe-list";

export default function RecipeCards() {
  return (
    <div>
      <RecipeList />
    </div>
  )
}
