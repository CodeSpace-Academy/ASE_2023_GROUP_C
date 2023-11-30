import Select from 'react-dropdown-select';
import { v4 } from 'uuid';

export default function FilterByCategory({ categoriesArr, selectedValues, onChange }) {
  // Map categories array to objects with 'label' and 'value'
  const options = categoriesArr.map((category) => { return { label: category, value: v4() }; });

  // const defaultOptions = selectedValues.map((category) => ({ label: category, value: v4() }));

  return (
    <div className="text-black">
      <h3>Categories</h3>
      <Select
        name="categories"
        options={options}
        labelField="label"
        valueField="value"
        multi
        onChange={onChange}
        values={selectedValues}
        color="red"
        dropdownPosition="bottom"
      />
    </div>
  );
}
