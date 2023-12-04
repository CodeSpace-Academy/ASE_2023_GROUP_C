/**

FilterByIngredients component for searching by ingredients.
@param {object} props - Component props.
@param {React.RefObject} props.ingredientsInputRef - Ref for the input element.
@param {function} props.handleIngredientsChange - Function to handle ingredient changes.
@returns {JSX.Element} - FilterByIngredients component.
*/

function FilterByIngredients({ value, onChange }) {
  return (
    <div className="text-black">
      <h3>Search by Ingredients</h3>
      <input
        type="text"
        className="inputWithShadow p-1 mb-4 bg-black-1000 rounded-l border-red-500  "
        value={value}
        name="filterByIngredients"
        onChange={onChange}
      />
    </div>
  );
}

export default FilterByIngredients;
