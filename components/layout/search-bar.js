import React, { useRef } from "react";

export default function SearchBar() {
  const searchRef = useRef()
  
  const submitHandler = () => {
    console.log(searchRef.current.value)
  }

  return (
    <form className="search-container" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search for recipes by title"
        ref = {searchRef}
      />
      <button>Search</button>
    </form>
  );
}
