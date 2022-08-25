import * as React from 'react';
import classNames from './button.module.css';

export const Button = ({
  onClick,
  variant = 'primary',
  children,
}: {
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}) => {
  const className = classNames[variant];
  return (
    <button className={`${classNames.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
