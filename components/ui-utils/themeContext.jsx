import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('day');

  const toggleTheme = () => {
    setTheme((prevTheme) => { return (prevTheme === 'day' ? 'night' : 'day'); });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
