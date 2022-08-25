import { OIcon, XIcon } from 'components';
import * as React from 'react';
import { SquareType } from 'types/enum';
import classNames from './header.module.css';

export const Header = ({
  currentPlayer,
  resetGame,
}: {
  currentPlayer: SquareType;
  resetGame?: () => void;
}) => {
  return (
    <div className={classNames.header}>
      <div className={classNames.row}>
        <div className={classNames.icon}>
          <XIcon />
        </div>
        <div className={classNames.icon}>
          <OIcon />
        </div>
      </div>
      <div className={classNames.current}>
        <div className={classNames.icon}>
          {currentPlayer === SquareType.X ? (
            <i className='material-icons'>&#10006;</i>
          ) : (
            <i className='material-icons'>&#11096;</i>
          )}
        </div>
        Turn
      </div>
      <div role='button' onClick={resetGame} className={classNames.reset}>
        <i className='material-icons'>&#xe5d5;</i>
      </div>
    </div>
  );
};
