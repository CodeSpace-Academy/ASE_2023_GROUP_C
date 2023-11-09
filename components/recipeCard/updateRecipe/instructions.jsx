import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import EditRecipeContent from './editableText';

function RecipeInstruction(props) {
  const { recipe, onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedInstruction, setEditedInstruction] = useState(recipe.instructions);

  const handleEditInstruction = (newInstruction) => {
    setEditedInstruction(
      newInstruction.split('\n').map(
        (instruction) => instruction.trim(),
      ),
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
              <li key={uuid()}>{`${index + 1}. ${instruction}`}</li> // Manually increment the index
            ))}
          </ol>
          <button type="button" onClick={() => setIsEditing(true)}>Edit Instructions</button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstruction;
