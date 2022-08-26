import * as React from 'react';
import classNames from './button.module.css';

export const Button = ({
  onClick,
  variant = 'primary',
  children,
  full,
}: {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'alternate';
  children?: React.ReactNode;
  full?: boolean;
}) => {
  const className = classNames[variant];
  return (
    <button
      className={`${classNames.button} ${className} ${
        full ? classNames.full : ''
      }`}
      onClick={onClick}>
      {children}
    </button>
  );
};
