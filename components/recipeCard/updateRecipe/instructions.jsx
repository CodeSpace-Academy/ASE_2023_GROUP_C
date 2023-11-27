import React, { useState } from 'react';
import { v4 } from 'uuid';
import EditRecipeContent from './editableText';

function RecipeInstruction(props) {
  const { recipe, onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedInstruction, setEditedInstruction] = useState(
    recipe.instructions,
  );

  const handleEditInstruction = async (newInstruction) => {
    const formattedInstructions = newInstruction.split('\n').map(
      (instruction) => instruction.trim(),
    );

    setEditedInstruction(formattedInstructions);
    setIsEditing(false);

    // Save the edited instruction to MongoDB
    await saveEditedInstructionToMongoDB(formattedInstructions);

    // Trigger the onEdit callback
    onEdit();
  };

  const saveEditedInstructionToMongoDB = async (formattedInstructions) => {
    const data = {
      instructions: formattedInstructions,
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
        throw new Error('Failed to save edited instruction');
      }

      // Handle the response as needed
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <EditRecipeContent
          initialValue={editedInstruction.join('\n')}
          onSave={handleEditInstruction}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <ol>
            {editedInstruction.map((instruction, index) => (
              <li key={v4()}>{`${index + 1}. ${instruction}`}</li>
            ))}
          </ol>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit Instructions
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstruction;
