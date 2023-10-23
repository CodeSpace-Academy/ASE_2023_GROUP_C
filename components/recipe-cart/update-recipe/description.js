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
    <div className=" flex flex-col">
      <h3 className=" font-bold text-2xl pb-2">Description</h3>
    <div>

      {isEditing ? (
        <EditRecipeContent
          initialValue={editedDescription}
          onSave={handleEditDescription}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p >{editedDescription}</p>
          <button className=" mt-5 mb-8" onClick={() => setIsEditing(true)}>Edit Description</button>

        </div>
      )}
      <div className=" mb-2 ">
        <h3 className=" mt-2 font-semibold text-2xl">Allergens:</h3>
        <Allergens 
          recipe = {recipe}
          allergensList = {allergensList}
        />
      </div>
    </div>
    </div>
  );
  }



export default RecipeDescription;
