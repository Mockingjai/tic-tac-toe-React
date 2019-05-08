import React from 'react';
import './Title/Title';
import Game from './Game/Game';
import './App.css';
import { Title } from "./Title/Title";

function App () {
  return (
    <div className="App">
      <Title />
      <Game />
    </div>
  );
}

export default App;
