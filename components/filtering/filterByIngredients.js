import React, { useRef } from 'react';

/**
 * FilterByIngredients component for searching by ingredients.
 * @param {object} props - Component props.
 * @param {React.RefObject} props.ingredientsInputRef - Ref for the input element.
 * @param {function} props.handleIngredientsChange - Function to handle ingredient changes.
 * @returns {JSX.Element} - FilterByIngredients component.
 */

const FilterByIngredients = ({ingredientsInputRef, handleIngredientsChange}) => {

  return (
    <div>
      <h3>Search by Ingredients</h3>
      <input
        type="text"
        className='text-black'
        name="filterByIngredients"
        ref={ingredientsInputRef}
      ></input>
      <button onClick={handleIngredientsChange}>Set</button>
    </div>
  );
};

export default FilterByIngredients;
























// import { useState } from 'react';

// const FilterByIngredients = ({ recipe }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = () => {
//     if (recipe && recipe.ingredients) {
//       const results = Object.keys(recipe.ingredients)
//         .filter(
//           (ingredientKey) =>
//             ingredientKey.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//         .map((ingredientKey) => ({
//           ingredient: ingredientKey,
//           quantity: recipe.ingredients[ingredientKey],
//         }));
//       setSearchResults(results);
//     }

//     console.log(searchResults)
//     console.log(searchQuery)
//   };

  

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search by ingredient"
//         style={{ color: 'black' }} // Set the text color to black
//       />
//       <button onClick={handleSearch}>Submit</button>
//       {searchResults.length > 0 && (
//         <div>
//           <h3 className="text-2xl font-semibold pb-2 pt-2">Ingredients:</h3>
//           <ul>
//             {searchResults.map((result, index) => (
//               <li key={index}>
//                 {result.quantity} of {result.ingredient}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterByIngredients;
