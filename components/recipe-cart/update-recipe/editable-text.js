import React, { useRef } from "react";

function EditRecipeContent(props) {
  const { initialValue, onSave, onCancel } = props;
  const textareaRef = useRef();

  const handleSave = () => {
    const newValue = textareaRef.current.value;
    onSave(newValue);
  };
  
  return (
    <div>
      <textarea
        ref={textareaRef}
        defaultValue={initialValue} // Use defaultValue instead of value
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditRecipeContent;
