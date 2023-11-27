import React, { useState } from 'react';
import EditRecipeContent from './editableText';
import Allergens from '../allergens/allergensIngredient';

function RecipeDescription(props) {
  const { recipe, allergensList, onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    recipe.description,
  );

  const handleEditDescription = async (newDescription) => {
    setEditedDescription(newDescription);
    setIsEditing(false);

    // Save the edited description to MongoDB
    await saveEditedDescriptionToMongoDB(newDescription);
    
    // Trigger the onEdit callback
    onEdit();
  };

  const saveEditedDescriptionToMongoDB = async (newDescription) => {
    const data = {
      description: newDescription,
      _id: recipe._id,
    };

    try {
      const response = await fetch('/api/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Corrected the variable name here
      });

      if (!response.ok) {
        throw new Error('Failed to save edited description');
      }

      // Handle the response as needed
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
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
            <button type="button" className=" mt-5 mb-8" onClick={() => setIsEditing(true)}>
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
