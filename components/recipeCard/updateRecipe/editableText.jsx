import React, { useRef } from 'react';

function EditRecipeContent(props) {
  const {
    initialValue, onSave, onCancel, rows,
  } = props;
  const textareaRef = useRef();

  const handleSave = () => {
    const newValue = textareaRef.current.value;
    onSave(newValue);
  };

  return (
    <div className="flex flex-col mt-2 mb-4 ">
      <textarea
        rows={rows + 2}
        ref={textareaRef}
        defaultValue={initialValue} // Use defaultValue instead of value
        className=" text-white p-2 bg-gray-500 rounded-xl shadow-lg"
      />
      <div className=" flex  mt-2 mb-4 gap-4">
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditRecipeContent;
