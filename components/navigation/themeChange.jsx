import { useState } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '../ui-utils/themeContext';

export default function ThemeChange() {
  const { theme, toggleTheme } = useTheme();
  const [icon, setIcon] = useState(theme === 'night' ? faMoon : faSun);

  const handleClick = () => {
    toggleTheme();
    setIcon((prevIcon) => { return (prevIcon === faMoon ? faSun : faMoon); });
  };
  return (
    <button
      aria-label="button"
      type="button"
      className="mr-4"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} size="lg" className="pr-2" />
    </button>
  );
}
