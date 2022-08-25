import { Square } from 'components';
import * as React from 'react';
import { SquareType } from 'types/enum';
import classNames from './board.module.css';

export const Board = ({
  squares,
  onClick,
}: {
  squares: SquareType[];
  onClick?: (index: number) => () => void;
}) => {
  return (
    <div className={classNames.board}>
      {squares.map((value, index) => {
        return <Square onClick={onClick?.(index)} key={index} value={value} />;
      })}
    </div>
  );
};
