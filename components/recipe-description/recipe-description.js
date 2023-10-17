import React, { useState } from "react";
import styles from "./recipe-description.module.css";
import EditableDescription from "./update-description/update-description";




function RecipeDescription(props) {
  const { recipe, ingredientsWithAllergensInRecipeInRecipe } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleEditDescription = (newDescription) => {
    console.log("New Description:", newDescription);

    setEditedDescription(newDescription);
    setIsEditing(false);
  };

  return (
    <div>
      <h3>Description</h3>
      {isEditing ? (
        <EditableDescription
          initialDescription={editedDescription}
          onSave={handleEditDescription}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p className={styles.description}>{editedDescription}</p>
          <h4>Allergens in this Recipe:</h4>
          {ingredientsWithAllergensInRecipeInRecipe && ingredientsWithAllergensInRecipeInRecipe.length > 0 ? (
            <ul>
              {ingredientsWithAllergensInRecipeInRecipe.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No allergens found in this recipe.</p>
          )}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}


export default RecipeDescription;
