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

  const handleEditInstruction = (newInstruction) => {
    setEditedInstruction(
      newInstruction
        .split('\n')
        .map((instruction, index) => { return instruction.replace(`${index + 1}.`, '').trim(); }),
    ); // Split into an array

    setIsEditing(false);
    onEdit();
  };
  const numberedText = editedInstruction.map(
    (instruction, index) => { return `${index + 1}. ${instruction}`; },
  );

  // smooth snap onto the editing title
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
            initialValue={numberedText.join('\n')} // Join the array with line breaks
            onSave={handleEditInstruction}
            onCancel={() => { return setIsEditing(false); }}
            rows={editedInstruction.length || 2}
            isOpen={isEditing}
          />
        </div>
      ) : (
        <div>
          <ol>
            {editedInstruction.map((instruction, index) => {
              return (
                <li key={v4()}>{`${index + 1}. ${instruction}`}</li> // Manually increment the index
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
