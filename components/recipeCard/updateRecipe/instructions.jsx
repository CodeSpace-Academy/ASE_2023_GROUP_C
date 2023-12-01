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
    const formattedInstructions = newInstruction
      .split('\n')
      .map((instruction, index) => { return instruction.replace(`${index + 1}.`, '').trim(); });

    // Save the edited instruction to MongoDB
    await saveEditedInstructionToMongoDB(formattedInstructions);

    // Update local state
    setEditedInstruction(formattedInstructions);

    // Trigger the onEdit callback
    onEdit();
    setIsEditing(false);
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const numberedText = editedInstruction.map(
    (instruction, index) => { return `${index + 1}. ${instruction}`; },
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

  return (
    <div>
      {isEditing ? (
        <div ref={editedInstructionRef}>
          <EditRecipeContent
            initialValue={numberedText.join('\n')}
            onSave={handleEditInstruction}
            onCancel={() => { return setIsEditing(false); }}
            rows={editedInstruction.length || 2}
            isOpen={isEditing}
          />
        </div>
      ) : (
        <div>
          <ol>
            {editedInstruction.map((instruction, index) => {return (
              <li key={v4()}>{`${index + 1}. ${instruction}`}</li>
            );
            })}
          </ol>
          <button
            type="button"
            onClick={() => { return setIsEditing(true); }}
            className="px-3 py-1 bg-green-500 text-white font-thin rounded-lg inline-block transition-all duration-300 ease-in-out hover:text-white-900 hover:font-semibold hover:tracking-wider hover:bg-green-700 hover:shadow-md"
          >
            Edit Instructions
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstruction;
