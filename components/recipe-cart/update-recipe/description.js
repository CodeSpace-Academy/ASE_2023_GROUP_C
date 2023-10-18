import React, { useState } from "react";
import EditRecipeContent from "./editable-text";


function RecipeDescription(props) {
  const { recipe, onEdit } = props;

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
      {isEditing ? (
        <EditRecipeContent
          initialValue={editedDescription}
          onSave={handleEditDescription}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p className="mb-4 font-semibold text-2">{editedDescription}</p>
          <button  className= 'mb-4'onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDescription;
