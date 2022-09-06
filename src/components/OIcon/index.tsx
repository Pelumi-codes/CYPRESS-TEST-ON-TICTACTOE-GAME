import * as React from 'react';
import classNames from './oicon.module.css';

const getStyle = (type?: 'active' | 'inactive') => {
  switch (type) {
    case 'active':
      return classNames.active;
    case 'inactive':
      return classNames.inactive;
    default:
      return '';
  }
};

export const OIcon = ({ state }: { state?: 'active' | 'inactive' }) => {
  return <div data-cy="click-o" className={`${classNames.icon} ${getStyle(state)}`} />;
};
