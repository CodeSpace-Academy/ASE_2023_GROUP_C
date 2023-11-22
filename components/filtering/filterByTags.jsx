import { v4 } from 'uuid';

export default function FilterByTags({ arrayOfUnigueTags, value, onChange }) {
  return (
    <div>
      <h3>Tags</h3>
      <select
        className="text-black"
        name="tags"
        value={value}
        onChange={onChange}
      >
        {arrayOfUnigueTags.map((tag) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={v4()} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
