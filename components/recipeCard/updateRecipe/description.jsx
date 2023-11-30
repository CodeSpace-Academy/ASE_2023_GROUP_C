import React, { useState } from 'react';
import EditRecipeContent from './editableText';
import Allergens from '../allergens/allergensIngredient';

function RecipeDescription(props) {
  const { recipe, allergensList, onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    recipe.description,
  );

  const handleEditDescription = (newDescription) => {
    setEditedDescription(newDescription);
    setIsEditing(false);

    onEdit();
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-2xl pb-2">Description</h3>
      <div>
        {isEditing ? (
          <EditRecipeContent
            initialValue={editedDescription}
            onSave={handleEditDescription}
            onCancel={() => { return setIsEditing(false); }}
          />
        ) : (
          <div>
            <p>{editedDescription}</p>
            <button type="button" className=" mt-5 mb-8" onClick={() => { return setIsEditing(true); }}>
              Edit Description
            </button>
          </div>
        )}
        <div className=" mb-2 ">
          <h3 className=" mt-2 font-semibold text-2xl">Allergens:</h3>
          <Allergens recipe={recipe} allergensList={allergensList} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDescription;
