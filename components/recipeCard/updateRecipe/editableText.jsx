import React, { useRef } from 'react';

function EditRecipeContent(props) {
  const { initialValue, onSave, onCancel } = props;
  const textareaRef = useRef();

  const handleSave = () => {
    const newValue = textareaRef.current.value;
    onSave(newValue);
  };

  return (
    <div className="flex flex-col mt-2 mb-4">
      <textarea
        ref={textareaRef}
        defaultValue={initialValue} // Use defaultValue instead of value
        className=" text-black"
      />
      <div>
        <button
          type="button"
          className=" flex mt-2 mb-4 gap-4 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className=" flex mt-2 mb-4 gap-4 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditRecipeContent;
