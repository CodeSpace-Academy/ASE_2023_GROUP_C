export default function Allergens({ recipe, allergensList }) {
  const { ingredients } = recipe;

  if (Array.isArray(allergensList)) {
    const ingredientsWithAllergensInRecipe = Object.keys(ingredients)
      .filter((key) => allergensList.some((allergen) => key.toLowerCase().includes(allergen)));

    return <div>{ingredientsWithAllergensInRecipe.join(', ')}</div>;
  }

  return null; // Return null or an appropriate value when allergensList is not an array.
}
