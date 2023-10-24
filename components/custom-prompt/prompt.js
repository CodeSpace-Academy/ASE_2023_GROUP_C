
import React, { useState } from 'react';

const CustomPrompt = ({ isOpen, onClose, onConfirm }) => {
    const [inputValue, setInputValue] = useState('');

    const handleConfirm = () => {
      onConfirm(inputValue);
     onClose();
    };

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
