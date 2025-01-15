import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Theme } from "../utils/Theme.jsx";

const kThemeStorage = "theme";
const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem(kThemeStorage);
  if (!theme) {
    localStorage.setItem("theme", Theme.dark);
    return Theme.dark;
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const saveToStorage = () => {
      localStorage.setItem(kThemeStorage, theme);
    };
    saveToStorage();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

ThemeProvider.propTypes = {
  children: PropTypes.object,
};
