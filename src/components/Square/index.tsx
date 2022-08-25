import { OIcon, XIcon } from 'components';
import * as React from 'react';
import { SquareType } from 'types/enum';
import classNames from './square.module.css';

const pickIcon = (value?: string) => {
  switch (value) {
    case SquareType.X:
      return <XIcon />;
    case SquareType.O:
      return <OIcon />;
    default:
      return null;
  }
};

export const Square = ({
  value,
  onClick,
}: {
  value?: SquareType;
  onClick?: () => void;
}) => {
  return (
    <div role='button' onClick={onClick} className={classNames.square}>
      {pickIcon(value)}
    </div>
  );
};
