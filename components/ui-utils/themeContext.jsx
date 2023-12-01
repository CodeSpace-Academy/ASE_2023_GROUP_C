import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

// Create a context to hold the theme-related values
const ThemeContext = createContext();

// ThemeProvider component manages the theme state and provides it to its children
export function ThemeProvider({ children }) {
  // State to track the current theme ('day' or 'night')
  const [theme, setTheme] = useState('day');

  // Function to toggle between 'day' and 'night' themes
  const toggleTheme = () => {
    setTheme((prevTheme) => { return (prevTheme === 'day' ? 'night' : 'day'); });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => { return { theme, toggleTheme }; }, [theme]);

  // Provide the context value to the tree of components
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to easily consume the theme context in functional components
export const useTheme = () => {
  return useContext(ThemeContext);
};
