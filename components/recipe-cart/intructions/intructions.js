import React, { useRef, useState } from 'react';

export default function Instructions(props) {
    const { recipe } = props;

    const instructionsRef = useRef();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedInstructions, setEditedInstructions] = useState(recipe.instructions); // Initialize with original instructions

    const enterEditMode = () => {
      setIsEditMode(true);
    };
  
    const saveInstructions = () => {
      const updatedInstructions = instructionsRef.current.value.split('\n');
      setEditedInstructions(updatedInstructions);
      setIsEditMode(false);
    };
  
    return (
      <div>
        {isEditMode ? (
          <div >
            <h3>Instructions</h3>
            <textarea
              ref={instructionsRef}
              defaultValue={editedInstructions.join('\n')} // Show edited instructions in textarea
            />
            <button onClick={saveInstructions}>Save Instructions</button>
          </div>
        ) : (
          <div>
            <h3>Instructions</h3>
            <ol>
              {editedInstructions.map((instruction, index) => ( // Display edited instructions
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <button onClick={enterEditMode}>Edit Instructions</button>
          </div>
        )}
      </div>
    );
}