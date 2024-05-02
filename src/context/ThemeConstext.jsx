import { useEffect, createContext, useState } from 'react';
import PropTypes from 'prop-types';
const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem('theme');

  if (theme) {
    return theme;
  } else {
    localStorage.setItem('theme', 'light-theme');
    return 'light-theme';
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  }

  useEffect(() => {
    const refreshThme = () => {
      localStorage.setItem('theme', theme);
    };
    refreshThme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export { ThemeContext, ThemeProvider };
