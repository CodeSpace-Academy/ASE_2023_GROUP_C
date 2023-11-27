import React from 'react';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button type="button" className="md:hidden" onClick={onClick}>
      {isOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
    </button>
  );
}

export default MobileMenuButton;
