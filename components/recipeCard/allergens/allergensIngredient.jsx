export default function Allergens({ recipe, allergensList }) {
  const { ingredients } = recipe;

<<<<<<<<< Temporary merge branch 1
  const ingredientsWithAllergensInRecipe = Object.keys(ingredients)
    .filter((key) => allergensList.some((allergen) => key.toLowerCase().includes(allergen)));
=========
  if (Array.isArray(allergensList)) {
    const ingredientsWithAllergensInRecipe = Object.keys(ingredients)
      .filter((key) => allergensList.some((allergen) => key.toLowerCase().includes(allergen)))
      .map((key) => ingredients[key]);
>>>>>>>>> Temporary merge branch 2

  return (
    <div>
      {ingredientsWithAllergensInRecipe.length > 0
        ? ingredientsWithAllergensInRecipe.join(', ')
        : 'No allergens'}
    </div>
  );}
