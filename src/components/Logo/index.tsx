import { OIcon, XIcon } from 'components';
import * as React from 'react';
import classNames from './logo.module.css';

export const Logo = () => {
  return (
    <div className={classNames.row}>
      <div className={classNames.icon}>
        <XIcon />
      </div>
      <div className={classNames.icon2}>
        <OIcon />
      </div>
    </div>
  );
};
