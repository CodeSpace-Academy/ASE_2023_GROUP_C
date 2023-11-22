import React, { useState } from 'react';
import { v4 } from 'uuid';
import EditRecipeContent from './editableText';

function RecipeInstruction(props) {
  const { recipe, onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedInstruction, setEditedInstruction] = useState(
    recipe.instructions,
  );

  const handleEditInstruction = (newInstruction) => {
    setEditedInstruction(
      newInstruction.split('\n').map((instruction) => instruction.trim()),
    ); // Split into an array

    setIsEditing(false);

    onEdit();
  };

  return (
    <div>
      {isEditing ? (
        <EditRecipeContent
          initialValue={editedInstruction.join('\n')} // Join the array with line breaks
          onSave={handleEditInstruction}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <ol>
            {editedInstruction.map((instruction, index) => (
              <li key={v4()}>{`${index + 1}. ${instruction}`}</li> // Manually increment the index
            ))}
          </ol>
          <button type="button" className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700" onClick={() => setIsEditing(true)}>
            Edit Instructions
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstruction;
