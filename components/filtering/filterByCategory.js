export default function FilterByCategory({ categoriesArr, value, onChange }) {
  return (
    <div>
      <h3>Categories</h3>
      <select
        className='text-black'
        name='categories'
        value={value}
        onChange={onChange}
      >
        {categoriesArr.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}