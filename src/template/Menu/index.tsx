import { Button, Logo, OIcon, XIcon } from 'components';
import * as React from 'react';
import { SquareType } from 'types/enum';
import classNames from './menu.module.css';

export const Menu = ({
  playerType,
  setPlayerType,
  startGame,
}: {
  playerType: SquareType;
  setPlayerType: React.Dispatch<React.SetStateAction<SquareType>>;
  startGame: (isCPU?: boolean) => () => void;
}) => {
  return (
    <div className='App'>
      <div className={classNames.menu}>
        <Logo />
        <div className={classNames.box}>
          <div className={classNames.topText}>PICK PLAYERS 1'S MARK</div>
          <div
            role='button'
            onClick={() =>
              setPlayerType((prev) =>
                prev === SquareType.X ? SquareType.O : SquareType.X
              )
            }
            className={`${classNames.select} ${
              classNames[playerType === SquareType.X ? 'x' : 'o']
            }`}>
            <div className={classNames.item} data-cy="x-letter">
              <XIcon
                state={playerType === SquareType.X ? 'active' : 'inactive'} 
              />
            </div>
            <div className={classNames.item} data-cy="o-letter">
              <OIcon
                state={playerType === SquareType.O ? 'active' : 'inactive'}
              />
            </div>
          </div>
          <div className={classNames.bottomText}>REMEMBER, X GOES FIRST</div>
        </div>

        <Button onClick={startGame(true)} full data-cy="start-game">
          NEW GAME (VS CPU)
        </Button>
        <div className={classNames.foot}>
          <Button onClick={startGame(false)} variant='alternate' full>
            NEW GAME (VS PLAYER)
          </Button>
        </div>
      </div>
    </div>
  );
};
