import { useContext } from "react";
import { BiSolidSun, BiMoon } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import "./ToggleThemeButton.css";
import { Theme } from "../../../utils/Theme";
import { ThemeContext } from "../../../theme/Theme.jsx";

export default function ToggleThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const variants = {
    show: {
      opacity: 1,
      y: 0,
    },
    hide: {
      y: 20,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="nav-button-item"
        key={theme}
        variants={variants}
        initial="hide"
        animate="show"
      >
        {theme == Theme.light ? (
          <BiSolidSun color="wheat" onClick={() => setTheme(Theme.dark)} />
        ) : (
          <BiMoon
            className={`nav-button-item dark`}
            onClick={() => setTheme(Theme.light)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
