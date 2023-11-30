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
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div>
            <p>{editedDescription}</p>
            <button
              type="button"
              className="px-3 py-1 bg-green-500 text-white font-thin rounded-lg inline-block transition-all duration-300 ease-in-out hover:text-white-900 hover:font-semibold hover:tracking-wider hover:bg-green-700 hover:shadow-md"
              onClick={() => setIsEditing(true)}
            >
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
