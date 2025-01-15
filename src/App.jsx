import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ThemeContext } from "./theme/Theme.jsx";
import Playlist from "./components/playlist/Playlist.jsx";
import HomePage from "./components/home/HomePage.jsx";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`left-0 right-0 top-0 bottom-0 w-full h-[100vh] fixed overflow-hidden`}>
      {/* <div className="absolute right-0 bottom-0 "> */}
        {/* <Playlist size={window.innerHeight * 0.8 } /> */}
      {/* </div> */}
      <HomePage/>
    </div>
  );
}

export default App;
