import * as React from 'react';
import { Score } from 'types';
import classNames from './footer.module.css';

export const Footer = ({ score, isCpu }: { score: Score; isCpu?: boolean }) => {
  return (
    <div className={classNames.footer}>
      <div className={`${classNames.box} ${classNames.x}`}>
        <div className={classNames.tiny}>X (YOU)</div>
        <div>{score.x}</div>
      </div>
      <div className={`${classNames.box} ${classNames.tie}`}>
        <div className={classNames.tiny}>TIES</div>
        <div>{score.tie}</div>
      </div>
      <div className={`${classNames.box} ${classNames.o}`}>
        <div className={classNames.tiny}>O ({isCpu ? 'CPU' : 'YOU'})</div>
        <div>{score[isCpu ? 'cpu' : 'o']}</div>
      </div>
    </div>
  );
};
