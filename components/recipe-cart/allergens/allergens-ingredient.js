import RecipeDescription from "../../recipe-description/recipe-description";

export default function Allergens(props) {

     const { recipe, allergensList } = props;
  const ingredients = recipe.ingredients;
  const ingredientsWithAllergens = [];
    for (let key in ingredients) {
      for (let allergen of allergensList) {
        if (key.toLowerCase().includes(allergen)) {
          ingredientsWithAllergens.push(key);
          
        }
      }
    }
  
    console.log(ingredientsWithAllergens)

    return (
        <div>
      <Allergens recipe={recipe} allergensList={allergensList} />
      <RecipeDescription
        recipe={recipe}
        ingredientsWithAllergens={ingredientsWithAllergens} 
      />
    </div>
  );
}

    