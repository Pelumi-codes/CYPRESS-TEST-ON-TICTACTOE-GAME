import { Button, OIcon, XIcon } from 'components';
import * as React from 'react';
import { GameState } from 'types/enum';
import classNames from './modal.module.css';

const getText = (winner: GameState) => {
  switch (winner) {
    case GameState.X_WON:
    case GameState.O_WON:
      return 'TAKES THE ROUND';
    case GameState.TIE:
      return 'THIS ROUND IS A TIE';
    default:
      return '';
  }
};

const getIcon = (winner: GameState) => {
  switch (winner) {
    case GameState.X_WON:
      return <XIcon />;
    case GameState.O_WON:
      return <OIcon />;
    default:
      return null;
  }
};

const getClass = (winner: GameState) => {
  switch (winner) {
    case GameState.X_WON:
      return classNames.x;
    case GameState.O_WON:
      return classNames.o;
    default:
      return classNames.tie;
  }
};

export const ScoreModal = ({
  winner,
  isCpu,
  onNext,
  onQuit,
}: {
  winner: GameState;
  isCpu?: boolean;
  onNext?: () => void;
  onQuit?: () => void;
}) => {
  return (
    <div className={classNames.modal}>
      <div className={classNames.body}>
        <div className={classNames.text}>
          {winner === GameState.TIE
            ? 'NO ONE WON!'
            : winner === GameState.O_WON && isCpu
            ? 'CPU WON'
            : 'YOU WON!'}
        </div>
        <div className={classNames.bigText}>
          {getIcon(winner)}
          <div className={`${classNames.inner} ${getClass(winner)}`}>
            {getText(winner)}
          </div>
        </div>
        <div className={classNames.footer}>
          <Button onClick={onQuit} variant='secondary'>
            Quit
          </Button>
          <span>
            <Button onClick={onNext}>Next round</Button>
          </span>
        </div>
      </div>
    </div>
  );
};
