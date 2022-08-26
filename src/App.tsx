import React, { useState } from 'react';
import './App.css';

import { Menu, Game } from 'template';
import { SquareType } from 'types/enum';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerType, setPlayerType] = React.useState(SquareType.X);
  const [isCPU, setIsCPU] = useState(false);

  const onQuitGame = () => setGameStarted(false);
  const startGame = (isCPU?: boolean) => () => {
    setIsCPU(!!isCPU);
    setGameStarted(true);
  };

  return gameStarted ? (
    <Game onQuitGame={onQuitGame} isCPU={isCPU} />
  ) : (
    <Menu
      setPlayerType={setPlayerType}
      playerType={playerType}
      startGame={startGame}
    />
  );
}

export default App;
