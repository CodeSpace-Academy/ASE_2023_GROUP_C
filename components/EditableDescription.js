// EditableDescription.js
import React, { useState, useEffect } from "react";

export default function EditableDescription({ recipe, onEditDescription, onCancelEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.editedDescription);

  useEffect(() => {
    setEditedDescription(recipe.editedDescription || recipe.description);
  }, [recipe._id, recipe.description, recipe.editedDescription]);

  const handleSave = () => {
    onEditDescription(recipe._id, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    onCancelEdit(recipe._id);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{editedDescription}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
