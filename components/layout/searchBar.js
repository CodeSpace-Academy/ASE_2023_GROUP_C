import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';


export default function SearchBar() {
  const searchRef = useRef();
  const router = useRouter()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const searchValue = searchRef.current.value
    router.push( `search/${searchValue}`)
  }
  

  // let searchText = !searchRef.current.value ? 'all' : searchRef.current.value
  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <label htmlFor='titleSearch'>Search</label>
      <input
        type="text"
        placeholder="Search for recipes by title"
        ref={searchRef}
        id='titleSearch'
        className=' text-black'
      />

      <button type='submit'>   
        Search   
      </button>
    </form>
  );
}