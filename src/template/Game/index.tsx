import React, { useCallback, useEffect } from 'react';
import { Board, Header, Footer, ScoreModal } from 'containers';
import { GameState, SquareType } from 'types/enum';
import { Score } from 'types';
import { useScoreStorage } from 'hooks';
import { WIN_COMBINATIONS } from 'utils';

export function Game({
  onQuitGame,
  isCPU,
}: {
  onQuitGame?: () => void;
  isCPU?: boolean;
}) {
  const cpuThinkingRef = React.useRef<any>();
  const [thinking, setThinking] = React.useState(false);
  const [squares, setSquares] = React.useState(Array(9).fill(SquareType.EMPTY));
  const [currentPlayer, setCurrentPlayer] = React.useState(SquareType.X);
  const [gameState, setGameState] = React.useState(GameState.IN_PROGRESS);
  const [score, setScore] = React.useState<Score>({
    x: 0,
    tie: 0,
    o: 0,
    cpu: 0,
  });

  useScoreStorage({ score, setScore });

  const handleClick = (index: number) => () => {
    const currentSquare = squares[index];
    if (currentPlayer === SquareType.O && isCPU) {
      return;
    }

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

  const getIndexesOfEmptySquares = useCallback((squares: string[]) => {
    return squares.reduce((acc, curr, index) => {
      if (curr === SquareType.EMPTY) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);
  }, []);

  const handleCPUPlay = useCallback(
    (squares: string[]) => {
      const emptySquares = getIndexesOfEmptySquares(squares);
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const randomIndexToPlay = emptySquares[randomIndex];
      setSquares((prev) => {
        const newSquares = [...prev];
        newSquares[randomIndexToPlay] = SquareType.O;
        return newSquares;
      });
      setThinking(false);
      setCurrentPlayer(SquareType.X);
    },
    [getIndexesOfEmptySquares]
  );

  useEffect(() => {
    if (cpuThinkingRef.current) {
      setThinking(false);
      clearTimeout(cpuThinkingRef.current);
    }
    if (
      isCPU &&
      gameState === GameState.IN_PROGRESS &&
      currentPlayer === SquareType.O
    ) {
      setThinking(true);
      cpuThinkingRef.current = setTimeout(() => {
        handleCPUPlay(squares);
      }, 2000);
    }

    return () => {
      cpuThinkingRef.current && clearTimeout(cpuThinkingRef.current);
    };
  }, [currentPlayer, gameState, handleCPUPlay, isCPU, squares]);

  const resetGame = () => {
    setSquares(Array(9).fill(SquareType.EMPTY));
    setGameState(GameState.IN_PROGRESS);
    setCurrentPlayer(SquareType.X);
  };

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

    WIN_COMBINATIONS.forEach((combination) => {
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
            ...(isCPU ? { cpu: prev.cpu + 1 } : { o: prev.o + 1 }),
          }));
          return setGameState(GameState.O_WON);
        }
      }
    });
  }, [gameState, hasPlayableSquares, isCPU, squares]);

  useEffect(() => {
    checkWinner();
  }, [checkWinner, squares]);

  return (
    <div className='App'>
      <div>
        <Header currentPlayer={currentPlayer} resetGame={resetGame} />
        <Board squares={squares} onClick={handleClick} />
        <Footer score={score} isCpu={isCPU} />
      </div>
      {gameState !== GameState.IN_PROGRESS && (
        <ScoreModal
          winner={gameState}
          isCpu={isCPU}
          onNext={resetGame}
          onQuit={onQuitGame}
        />
      )}
      <div className='think-box'>
        {thinking && <div className='thinking'></div>}
      </div>
    </div>
  );
}
