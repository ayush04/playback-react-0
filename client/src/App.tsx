import React from "react";
import "./App.css";
import "./assets/styles/app.scss";
import Header from "./components/header/header";
import Player from "./components/player/player";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-footer fixed-bottom">
        <Player />
      </div>
    </div>
  );
}

export default App;
