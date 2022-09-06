import { Button } from 'components';
import * as React from 'react';
import classNames from './modal.module.css';

export const RestartModal = ({
  onRestart,
  onCancel,
  isOpen,
}: {
  onRestart?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
}) => {
  return (
    <div
      className={`${classNames.modal} ${
        classNames[isOpen ? 'open' : 'close']
      }`}>
      <div className={classNames.body}>
        <div className={classNames.bigText}>
          <div className={classNames.inner}>RESTART GAME?</div>
        </div>
        <div className={classNames.footer}>
          <Button onClick={onCancel} variant='secondary' data-testid="cancel-restart">
            NO, CANCEL
          </Button>
          <span>
            <Button onClick={onRestart}>YES, RESTART</Button>
          </span>
        </div>
      </div>
    </div>
  );
};
