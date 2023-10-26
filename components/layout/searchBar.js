import React, { useRef } from 'react';
import Link from 'next/link'; 

export default function SearchBar() {
  const searchRef = useRef();
  

  return (
    <form className="search-container">
      <label htmlFor='titleSearch'></label>
      <input
        type="text"
        placeholder="Search for recipes by title"
        ref={searchRef}
        id='titleSearch'
      />
      <button onClick={handleSearch}>
        <Link to={`/search/${searchRef.current.value}`}>Search</Link>
      </button>
    </form>
  );
}