export default function Allergens({ recipe, allergensList }) {
  const { ingredients } = recipe;

  const ingredientsWithAllergensInRecipe = Object.keys(ingredients)
    .filter((key) => {
      return allergensList.some(
        (allergen) => { return key.toLowerCase().includes(allergen); },
      );
    });

  return (
    <div>
      {ingredientsWithAllergensInRecipe.length > 0
        ? ingredientsWithAllergensInRecipe.join(', ')
        : 'No allergens'}
    </div>
  );
}
