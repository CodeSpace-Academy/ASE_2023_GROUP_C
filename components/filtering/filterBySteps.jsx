/**
 *FilterBySteps component for selecting the number of steps.
 *@param {object} props - Component props.
 *@param {number} props.value - The current value of the steps.
 *@param {function} props.onChange - Function to handle value changes.
 *@returns {JSX.Element} - FilterBySteps component.
*/

export default function FilterBySteps({ value, onChange }) {
  return (
    <div className="text-black pt-4">
      <h3>
        Number of Steps:
        {value}
      </h3>
      <input
        type="range"
        min="1"
        max="40"
        value={value}
        name="numberOfSteps"
        onChange={onChange}
      />
    </div>
  );
}
