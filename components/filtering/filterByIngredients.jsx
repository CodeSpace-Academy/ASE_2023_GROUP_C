/**

FilterByIngredients component for searching by ingredients.
@param {object} props - Component props.
@param {React.RefObject} props.ingredientsInputRef - Ref for the input element.
@param {function} props.handleIngredientsChange - Function to handle ingredient changes.
@returns {JSX.Element} - FilterByIngredients component.
*/

function FilterByIngredients({ value, onChange, handleIngredientsChange }) {
  return (
    <div>
      <h3 className="text-black">Search by Ingredients:</h3>
      <input
        type="text"
        className="text-black inputWithShadow"
        value={value}
        name="filterByIngredients"
        onChange={onChange}
      />
      <button type="button" onClick={handleIngredientsChange} className="text-black bg-blue-700">
        {' '}
        Set
        {' '}
      </button>
    </div>
  );
}

export default FilterByIngredients;
