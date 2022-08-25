import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Board, Header, Footer, ScoreModal } from 'containers';
import { GameState, SquareType } from 'types/enum';
import { Score } from 'types';
import { useScoreStorage } from 'hooks';

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [squares, setSquares] = React.useState(Array(9).fill(SquareType.EMPTY));
  const [currentPlayer, setCurrentPlayer] = React.useState(SquareType.X);
  const [gameState, setGameState] = React.useState(GameState.TIE);
  const [score, setScore] = React.useState<Score>({
    x: 0,
    tie: 0,
    o: 0,
    cpu: 0,
  });

  useScoreStorage({ score, setScore });

  const handleClick = (index: number) => () => {
    const currentSquare = squares[index];

    if (
      gameState === GameState.IN_PROGRESS &&
      currentSquare === SquareType.EMPTY
    ) {
      setSquares((prev) => {
        const newSquares = [...prev];
        newSquares[index] = currentPlayer;
        return newSquares;
      });

      setCurrentPlayer((prev) =>
        prev === SquareType.X ? SquareType.O : SquareType.X
      );
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(SquareType.EMPTY));
    setGameState(GameState.IN_PROGRESS);
    setCurrentPlayer(SquareType.X);
  };

  const onQuitGame = () => {};

  const hasPlayableSquares = squares.some(
    (square) => square === SquareType.EMPTY
  );

  const checkWinner = useCallback(() => {
    if (gameState !== GameState.IN_PROGRESS) {
      return;
    }

    if (!hasPlayableSquares && gameState === GameState.IN_PROGRESS) {
      setScore((prev) => ({
        ...prev,
        tie: prev.tie + 1,
      }));
      return setGameState(GameState.TIE);
    }
    console.log('running');

    winCombinations.forEach((combination) => {
      const [a, b, c] = combination;
      if (
        squares[a] !== SquareType.EMPTY &&
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === SquareType.X) {
          setScore((prev) => ({
            ...prev,
            x: prev.x + 1,
          }));
          return setGameState(GameState.X_WON);
        } else {
          setScore((prev) => ({
            ...prev,
            o: prev.o + 1,
          }));
          return setGameState(GameState.O_WON);
        }
      }
    });
  }, [gameState, hasPlayableSquares, squares]);

  useEffect(() => {
    checkWinner();
  }, [checkWinner, squares]);

  return (
    <div className='App'>
      <div>
        <Header currentPlayer={currentPlayer} resetGame={resetGame} />
        <Board squares={squares} onClick={handleClick} />
        <Footer score={score} isCpu={false} />

        {/* {gameState === GameState.IN_PROGRESS ? null : gameState ===
          GameState.TIE ? (
          <div>tie</div>
        ) : (
          <div>winner {gameState}</div>
        )} */}
      </div>
      {gameState !== GameState.IN_PROGRESS && (
        <ScoreModal winner={gameState} isCpu={false} onNext={resetGame} />
      )}
    </div>
  );
}

export default App;
