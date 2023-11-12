import { createContext, useState } from 'react';

/**
 * Context for managing recipe filtering.
 * @type {React.Context<{ filter: object, setFilter: Function }>}
 */
export const FilterContext = createContext();

/**
 * Provides a context to manage recipe filtering for child components.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context provider.
 * @returns {JSX.Element} - JSX element containing the context provider.
 */

export function RecipeProvider({ children }) {
  // Define initial state for the filter object using useState.
  const [filter, setFilter] = useState({
    categories: '',
    tags: '',
    numberOfSteps: '',
    filterByIngredients: '',

  });

  // Create a value object that contains the filter state and the setFilter function.
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const valueObject = { filter, setFilter };

  return (
    // Provide the FilterContext with the value object to its children.
    <FilterContext.Provider value={valueObject}>
      {children}
    </FilterContext.Provider>
  );
}
