
import React, { useState } from 'react';

// Define a functional component named CustomPrompt that takes isOpen, onClose, and onConfirm as props.
const CustomPrompt = ({ isOpen, onClose, onConfirm }) => {
    const [inputValue, setInputValue] = useState('');

// Define a function to handle the confirmation action.
 // Call the onConfirm function, passing inputValue as an argument.
    const handleConfirm = () => {
      onConfirm(inputValue);
     onClose();
    };

 // A div element with a class name 'custom-prompt' and conditional 'open' class based on the value of isOpen.
  return (
   <div className={`custom-prompt ${isOpen ? 'open' : ''}`}>
      <div className="modal-content text-center">
        <p className='text-white'> Are you sure you want to unfavourite ?</p>
       <button onClick={handleConfirm}>OK</button>
       <button onClick={onClose}>Cancel</button>
      </div>
    </div>
 );
  };
  

export default CustomPrompt;


