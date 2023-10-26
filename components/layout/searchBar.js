import Link from 'next/link';
import React, { useRef, useState } from 'react';


export default function SearchBar() {
  const searchRef = useRef();
  const [searchTerms, setSearchTerms] = useState('');
  const [ text, setText ] = useState('all')
 


  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(searchRef.current.value);
  }
  

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
        <Link href={`/search/${text}`}>
        Search
        </Link>     
      </button>
    </form>
  );
}