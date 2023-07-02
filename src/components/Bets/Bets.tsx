import React from 'react';
import './Bets.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actualBetActions } from '../../features/actualBet';

export const Bets:React.FC = () => {
  const { startedGame } = useAppSelector(state => state.startedGame);
  const { actualBet } = useAppSelector(state => state.actualBet);
  const { actualBalance } = useAppSelector(state => state.actualBalance);
  const dispatch = useAppDispatch();

  const decreaseBet = (decreaseBetAmount: number) => {
    if (decreaseBetAmount < actualBet) {
      return dispatch(actualBetActions.setActualBet(actualBet - decreaseBetAmount));
    }

    return null;
  };

  return (
    <div className="bets">
      <div className="bets__bet">
        <p className="bets__startBet">{`Your bet is $${actualBet}`}</p>

        <p className="bets__startBet">{`My balance is $${actualBalance}`}</p>

        {startedGame && (
          <div className="bets__chips">
            <button
              type="button"
              className="bets__chip bets__chip--1"
              onClick={() => {
                if (actualBalance >= 1 && actualBalance >= actualBet + 1) {
                  dispatch(actualBetActions.setActualBet(actualBet + 1));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                decreaseBet(1);
              }}
            >
            </button>
            <button
              type="button"
              className="bets__chip bets__chip--10"
              onClick={() => {
                if (actualBalance >= 10 && actualBalance >= actualBet + 10) {
                  dispatch(actualBetActions.setActualBet(actualBet + 10));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                decreaseBet(10);
              }}
            >
            </button>
            <button
              type="button"
              className="bets__chip bets__chip--100"
              onClick={() => {
                if (actualBalance >= 100 && actualBalance >= actualBet + 100) {
                  dispatch(actualBetActions.setActualBet(actualBet + 100));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                decreaseBet(100);
              }}
            >
            </button>
            <button
              type="button"
              className="bets__chip bets__chip--500"
              onClick={() => {
                if (actualBalance >= 500 && actualBalance >= actualBet + 500) {
                  dispatch(actualBetActions.setActualBet(actualBet + 500));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                decreaseBet(500);
              }}
            >
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
