
import React, { useState } from 'react';

// Define a functional component named CustomPrompt that takes isOpen, onClose, and onConfirm as props.
//const CustomPrompt = ({ isOpen, onClose, onConfirm }) => {
   // const [inputValue, setInputValue] = useState('');

// Define a function to handle the confirmation action.
 // Call the onConfirm function, passing inputValue as an argument.
    //const handleConfirm = () => {
     // onConfirm(inputValue);
     //onClose();
  // };

 // A div element with a class name 'custom-prompt' and conditional 'open' class based on the value of isOpen.
 // return (
  // <div className={`custom-prompt ${isOpen ? 'open' : ''}`}>
     //<div className="modal-content text-center">
     //  <p className='text-white'> Are you sure you want to unfavourite ?</p>
      // <button onClick={handleConfirm}>OK</button>
      //<button onClick={onClose}>Cancel</button>
    // </div>
    //</div>
// );
 //};
  

//export default CustomPrompt;





// Function to handle the click event on the unfavorite button
function unfavoriteRecipe() {
  // Check if the user really wants to unfavorite the recipe
  if (confirm("Are you sure you want to unfavorite this recipe?")) {
      // User confirmed, perform the unfavorite action here
      // You can put your unfavorite logic here, e.g., remove the recipe from favorites
      // Example: removeFromFavorites(recipeId);
      alert("Recipe has been unfavorited");
  } else {
      // User canceled, do nothing
      // Example: Do nothing
      alert("Unfavoriting canceled");
  }
}

// Attach the unfavoriteRecipe function to the click event of the unfavorite button
document.getElementById("unfavorite-button").addEventListener("click", unfavoriteRecipe);



