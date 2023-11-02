import { useState } from 'react';
import FilterByCategory from './filterByCategory';
import FilterBySteps from './filterBySteps';

export default function Filtering({ categoriesArr, data, onChange}) {

  return (
    <div className='text-white'>
      <FilterByCategory
        categoriesArr={categoriesArr}
        value={data.categories}
        onChange={onChange}
      />
      <FilterBySteps
        value={data.numberOfSteps}
        onChange={onChange}
      />

    </div>
  );
}