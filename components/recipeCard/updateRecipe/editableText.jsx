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
    <div className="flex flex-col mt-2 mb-4">
      <textarea
        rows={rows + 2}
        ref={textareaRef}
        defaultValue={initialValue} // Use defaultValue instead of value
        className=" text-white p-2 bg-gray-500 rounded-xl shadow-lg"
      />
      <div className=" flex  mt-2 mb-4 gap-4">
        <button
          type="button"
          className="px-3 py-1 bg-gray-800 text-white font-thin rounded-lg inline-block transition-all duration-300 ease-in-out hover:text-gray-900 hover:font-semibold hover:tracking-wider hover:bg-transparent hover:shadow-md"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-gray-800 text-white font-thin rounded-lg inline-block transition-all duration-300 ease-in-out hover:text-gray-900 hover:font-semibold hover:tracking-wider hover:bg-transparent hover:shadow-md"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditRecipeContent;
