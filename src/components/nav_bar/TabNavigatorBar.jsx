import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./TabNavigatorBar.css";
import ToggleThemeButton from "./buttons/ToggleThemeButton.jsx";
import { ThemeContext } from "../../theme/Theme.jsx";

export default function TabNavigatorBar(props) {
  const { theme } = useContext(ThemeContext);
  const tabRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);
  const [gliderStyle, setGliderStyle] = useState({
    width: "0px",
    height: "0px",
    transform: "",
  });

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= tabRefs.current.length) {
      return;
    }
    const tab = tabRefs.current[selectedIndex];

    setGliderStyle({
      width: `${tab.offsetWidth}px`,
      height: `${tab.offsetHeight}px`,
      transform: `translateX(${tab.offsetLeft}px)`,
    });
  }, [selectedIndex]);

  return (
    <div className={`nav-tab ${theme}`}>
      {/* Tabs */}
      <div className="tab-container">
        {props.tabs.map(function (e, index) {
          return (
            <div
              key={e}
              className="tab-item"
              onClick={() => setSelectedIndex(index)}
              ref={(e) => {
                tabRefs.current[index] = e;
              }}
            >
              {e}
            </div>
          );
        })}
        <span
          className={`tab-glider ${theme}`}
          style={{
            width: gliderStyle.width,
            height: gliderStyle.height,
            transform: gliderStyle.transform,
          }}
        ></span>
      </div>

      {/* Buttons */}
      <div className={`nav-button-container ${theme}`}>
        <div className="toogle-button">
          <ToggleThemeButton />
          <div className="change-theme-mask" ></div>
        </div>
      </div>
    </div>
  );
}

TabNavigatorBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};
