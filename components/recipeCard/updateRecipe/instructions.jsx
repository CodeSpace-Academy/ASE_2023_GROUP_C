import React, { useState, useRef, useEffect } from 'react';
import { v4 } from 'uuid';
import EditRecipeContent from './editableText';

function RecipeInstruction(props) {
  const { recipe, onEdit } = props;
  const editedInstructionRef = useRef();
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

  const numberedText = editedInstruction.map(
    (instruction, index) => `${index + 1}. ${instruction}`,
  );

  // Smooth snap onto the editing title
  useEffect(() => {
    if (isEditing && editedInstructionRef.current) {
      editedInstructionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isEditing]);

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
        <div ref={editedInstructionRef}>
          <EditRecipeContent
            initialValue={numberedText.join('\n')} // Join the array with line breaks
            onSave={handleEditInstruction}
            onCancel={() => setIsEditing(false)}
            rows={editedInstruction.length || 2}
            isOpen={isEditing}
          />
        </div>
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
