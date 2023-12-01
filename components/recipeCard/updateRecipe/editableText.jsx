import React, { useRef } from 'react';
// EditRecipeContent component for editing recipe content
function EditRecipeContent(props) {
  // Destructure props for ease of use
  const {
    initialValue, // Initial value of the content to be edited
    onSave, // Function to handle saving the edited content
    onCancel, // Function to handle canceling the editing process
    rows, // Number of rows for the textarea
  } = props;

  // Create a ref for the textarea to access its value
  const textareaRef = useRef();

  // Function to handle saving the edited content
  const handleSave = () => {
    // Get the new value from the textarea
    const newValue = textareaRef.current.value;
    // Call the onSave function with the new value
    onSave(newValue);
  };

  // Render the EditRecipeContent component
  return (
    <div className="flex flex-col mt-2 mb-4">
      {/* Textarea for editing content */}
      <textarea
        rows={rows + 2}
        ref={textareaRef}
        defaultValue={initialValue} // Use defaultValue instead of value
        className="text-white p-2 bg-gray-500 rounded-xl shadow-lg"
      />
      {/* Buttons for saving or canceling the editing process */}
      <div className="flex mt-2 mb-4 gap-4">
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

// Export the EditRecipeContent component
export default EditRecipeContent;
