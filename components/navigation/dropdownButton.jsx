import React, { useState } from 'react';
import Link from 'next/link';
import { faUser, faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DropdownButton() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggling the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Rendering the dropdown button and options
  return (
    <div className="relative inline-block">
      <div
        aria-label="User Menu"
        role="button"
        tabIndex={0}
        className="p-2 flex flex-wrap justify-center border-slate-400 border rounded-lg items-center md:justify-between cursor-pointer"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown();
          }
        }}
      >
        <FontAwesomeIcon icon={faUser} size="lg" className="pr-2" />
        <FontAwesomeIcon icon={faBars} size="lg" className="pr-2" />
      </div>
      <div
        className={`absolute ${
          isDropdownOpen ? 'block' : 'hidden'
        } mt-2 bg-white border rounded-lg shadow-md`}
      >
        {/* Login option */}
        <Link href="/api/auth/login">
          <div className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700">
            Login
          </div>
        </Link>
        {/* Favorite button */}
        <Link href="/recipes/favourites">
          <div className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700">
            <FontAwesomeIcon icon={faHeart} size="lg" className="pr-2" />
            Favorite
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DropdownButton;
