export default function FilteringByCategory({categories}) {

    return (
      <div>
        <select className='text-black'>
          {categories.map((category, index) => (
            <option key={index} >{category}</option>
          ))}
        </select>
      </div>
    )
  }
  