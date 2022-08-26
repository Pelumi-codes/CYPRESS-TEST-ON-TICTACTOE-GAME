import { Logo } from 'components';
import { RestartModal } from 'containers';
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
  const [showModal, setShowModal] = React.useState(false);

  const onCancel = () => setShowModal(false);
  const onOpen = () => setShowModal(true);
  const onRestart = () => {
    onCancel();
    resetGame?.();
  };
  return (
    <div className={classNames.header}>
      <div className={classNames.item}>
        <Logo />
      </div>
      <div className={classNames.item2}>
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
      </div>
      <div className={classNames.item3}>
        <div role='button' onClick={onOpen} className={classNames.reset}>
          <i className='material-icons'>&#xe5d5;</i>
        </div>
      </div>
      <RestartModal
        onRestart={onRestart}
        onCancel={onCancel}
        isOpen={showModal}
      />
    </div>
  );
};
