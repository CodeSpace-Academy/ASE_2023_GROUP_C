import Select from 'react-dropdown-select';
import { v4 } from 'uuid';

export default function FilterByCategory({ arrayOfUnigueTags, onChange, selectedValues }) {
  // Map categories array to objects with 'label' and 'value'
  const options = arrayOfUnigueTags.map((tags) => { return { label: tags, value: v4() }; });

  return (
    <div className="text-black">
      <h3>Tags</h3>
      <Select
        name="tags"
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
