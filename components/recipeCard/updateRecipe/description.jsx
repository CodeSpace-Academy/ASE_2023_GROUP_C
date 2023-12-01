import React, { useState, useEffect } from 'react';
import EditRecipeContent from './editableText';
import Allergens from '../allergens/allergensIngredient';

function RecipeDescription(props) {
  const { recipe, allergensList, onEdit } = props;

  // State variables
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    localStorage.getItem('editedDescription') || recipe.description
  );

  // useEffect to update localStorage whenever editedDescription changes
  useEffect(() => {
    localStorage.setItem('editedDescription', editedDescription);
  }, [editedDescription]);

  // Function to save edited description to MongoDB
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
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save edited description');
      }

      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditDescription = async (newDescription) => {
    setEditedDescription(newDescription);
    setIsEditing(false);

    // Save the edited description to MongoDB
    await saveEditedDescriptionToMongoDB(newDescription);

    // Trigger the onEdit callback
    onEdit();
  };

  // Render the component
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
            <button
              type="button"
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700"
              onClick={() => { return setIsEditing(true); }}
            >
              Edit Description
            </button>
          </div>
        )}
        <div className="mb-2">
          <h3 className="mt-2 font-semibold text-2xl">Allergens:</h3>
          <Allergens recipe={recipe} allergensList={allergensList} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDescription;
