import { uuid } from 'uuidv4';

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
          <option key={uuid()} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
