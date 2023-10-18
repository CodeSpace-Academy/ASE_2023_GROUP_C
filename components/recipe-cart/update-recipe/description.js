import React, { useState } from "react";
import EditRecipeContent from "./editable-text";
import Allergens from "../allergens/allergens-ingredient";
// import styles from "./recipe-description.module.css";
// import EditableDescription from "./update-description/update-description";

function RecipeDescription(props) {
  const { recipe, allergensList,  onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  const handleEditDescription = (newDescription) => {
    console.log("New Description:", newDescription);
    
    setEditedDescription(newDescription);
    setIsEditing(false);

    onEdit()
  };

  return (
    <div>
      <h3>Description</h3>
      {isEditing ? (
        <EditRecipeContent
          initialValue={editedDescription}
          onSave={handleEditDescription}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p >{editedDescription}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <div>
        <h3>Allergens:</h3>
        <Allergens 
          recipe = {recipe}
          allergensList = {allergensList}
        />
      </div>
    </div>
  );
}

export default RecipeDescription;
