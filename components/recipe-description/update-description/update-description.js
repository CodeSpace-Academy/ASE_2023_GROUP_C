import React, { useState } from "react";

function EditableDescription(props) {
  const { initialDescription, onSave, onCancel } = props;
  const [editedDescription, setEditedDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(editedDescription);
  };

  return (
    <div>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditableDescription;
