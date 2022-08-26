import * as React from 'react';
import classNames from './xicon.module.css';

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

export const XIcon = ({ state }: { state?: 'active' | 'inactive' }) => {
  return <div className={`${classNames.icon} ${getStyle(state)}`} />;
};
