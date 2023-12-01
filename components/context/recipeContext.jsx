import React, { createContext, useState, useMemo } from 'react';

/**
 * Context for managing recipe filtering.
 * @type {React.Context<{ filter: object, setFilter: Function }>}
 */
export const AppContext = createContext();

/**
 * Provides a context to manage recipe filtering for child components.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context provider.
 * @returns {JSX.Element} - JSX element containing the context provider.
 */

export function RecipeProvider({ children }) {
  const [removedFromFavourites, setRemovedFromFavourites] = useState('');

  const valueObject = useMemo(() => {
    return {
      removedFromFavourites,
      setRemovedFromFavourites,
    };
  }, [removedFromFavourites]);

  return (
    // Provide the FilterContext with the value object to its children.
    <AppContext.Provider value={valueObject}>{children}</AppContext.Provider>
  );
}
