
export default function Allergens({ recipe, allergensList }) {

  const ingredients = recipe.ingredients
  const ingredientsWithAllergensInRecipe = [];

  for (let key in ingredients) {
    for (let allergen of allergensList) {
      if (key.toLowerCase().includes(allergen)) {
        ingredientsWithAllergensInRecipe.push(key);
        
      }
    }
  }

  return (
    <div>
      {ingredientsWithAllergensInRecipe}
    </div>
  );
}

    