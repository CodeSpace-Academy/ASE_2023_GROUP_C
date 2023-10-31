import FilteringByCategory from './filterByCategory'

export default function Filtering({categoriesArr}) {

  return (
    <div className='text-white'>
        <h3>Categories</h3>
        <FilteringByCategory 
        categories={categoriesArr}
        />
        <div>
            <h3>Number of Steps</h3>
            <input 
            type='text'
            placeholder='number of instructions'
            />
        </div>
    </div>
  )
}
