import React, { useState } from 'react';
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
        .map((instruction, index) => instruction.replace(`${index + 1}.`, '').trim()),
    ); // Split into an array

    setIsEditing(false);
    onEdit();
  };
  const numberedText = editedInstruction.map(
    (instruction, index) => `${index + 1}. ${instruction}`,
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
            onCancel={() => setIsEditing(false)}
            rows={editedInstruction.length || 2}
            isOpen={isEditing}
          />
        </div>
      ) : (
        <div>
          <ol>
            {editedInstruction.map((instruction, index) => (
              <li key={v4()}>{`${index + 1}. ${instruction}`}</li> // Manually increment the index
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
