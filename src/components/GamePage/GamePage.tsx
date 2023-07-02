import React, { useState, useEffect } from 'react';
import './GamePage.scss';
import { Loader } from '../Loader';
import { Bets } from '../Bets/Bets';
import { DealerCards } from '../DealerCards/DealerCards';
import { MyCards } from '../MyCards/MyCards';
import { actions as startedGameActions } from '../../features/startedGame';
import { actions as actualBalanceActions } from '../../features/actualBalance';
import { actions as actualBetActions } from '../../features/actualBet';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const GamePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { startedGame } = useAppSelector(state => state.startedGame);
  const dispatch = useAppDispatch();
  const [dealerCards, setDealerCards] = useState<string[]>([]);
  const [myCards, setMyCards] = useState<string[]>([]);
  const [mySum, setMySum] = useState<number>(0);
  const [dealerSum, setDealerSum] = useState<number>(0);
  const [finishedGame, setFinishedGame] = useState<boolean>(false);
  const [youLost, setYouLost] = useState<boolean>(false);
  const [youWon, setYouWon] = useState<boolean>(false);
  const [youPushed, setYouPushed] = useState<boolean>(false);
  const [bj, setBj] = useState<boolean>(false);
  const [deck, setDeck] = useState<string[]>([]);
  const [hiddenCard, setHiddenCard] = useState<string>('');
  const { actualBalance } = useAppSelector(state => state.actualBalance);
  const { actualBet } = useAppSelector(state => state.actualBet);

  const getValue = (cards: string[]) => {
    let count = 0;

    for (let i = 0; i < cards.length; i += 1) {
      const data = cards[i].split('-');
      const value = data[0];

      if (value === 'BACK') {
        count += 0;
      } else if (value === 'A') {
        count += 11;
      } else if (value === 'K' || value === 'J' || value === 'Q') {
        count += 10;
      } else {
        count += +value;
      }
    }

    return count;
  };

  const openHiddenCard = () => {
    const updatedCards = [...dealerCards];

    updatedCards.shift();
    setDealerCards([
      hiddenCard,
      ...updatedCards,
    ]);

    setDealerSum(dealerSum + getValue([hiddenCard]));
  };

  const startGame = (startDeck: string[]) => {
    const updatedDeck = [...startDeck];
    const myStartCards = [];
    const hidden = updatedDeck.pop() || '';
    const dealerStartCards = ['BACK'];
    const dealerStartCard = updatedDeck.pop() || '';

    dealerStartCards.push(dealerStartCard);

    for (let i = 0; i < 2; i += 1) {
      const card = updatedDeck.pop() || '';

      myStartCards.push(card);
    }

    setMyCards(myStartCards);
    setDealerCards(dealerStartCards);
    setDeck(updatedDeck);
    setHiddenCard(hidden);
    setMySum(getValue(myStartCards));
    setDealerSum(getValue(dealerStartCards));

    if (getValue(myStartCards) === 21) {
      setBj(true);
      setYouWon(true);
    }
  };

  const hit = () => {
    const updatedDeck = [...deck];
    const card = updatedDeck.pop() || '';

    setMyCards([
      ...myCards,
      card,
    ]);
    setDeck(updatedDeck);
    setMySum(mySum + getValue([card]));

    if (mySum + getValue([card]) > 21) {
      setFinishedGame(true);
      openHiddenCard();
      setYouLost(true);
    }

    if (mySum + getValue([card]) === 21) {
      setFinishedGame(true);
      openHiddenCard();
    }
  };

  const checkScore = (sum: number) => {
    if (sum < mySum || sum > 21) {
      setYouWon(true);
    } else if (sum === mySum) {
      setYouPushed(true);
    } else {
      setYouLost(true);
    }
  };

  const dealerMove = () => {
    const updatedDeck = [...deck];
    let value = dealerSum;
    const cards = [];

    while (value < 17) {
      const card = deck.pop() || '';

      value += getValue([card]);
      cards.push(card);
    }

    setDealerCards([...dealerCards, ...cards]);
    setDeck(updatedDeck);
    setDealerSum(value);
    checkScore(value);
  };

  useEffect(() => {
    if (finishedGame && mySum <= 21) {
      dealerMove();
    }
  }, [finishedGame]);

  const buildDeck = () => {
    const newDeck: string[] = [];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const types = ['C', 'D', 'H', 'S'];

    types.forEach(type => {
      values.forEach(value => {
        newDeck.push(`${value}-${type}`);
      });
    });
    const shuffledDeck = newDeck.sort(() => Math.random() - 0.5);

    startGame(shuffledDeck);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(startedGameActions.setStartedGame(true));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    isLoading
      ? <Loader />
      : (
        <>
          {youLost && (
            <div className="gamePage__notification notification is-warning">
              You lost!

              <button
                type="button"
                className="gamePage__button button is-success is-medium"
                onClick={() => {
                  setYouLost(false);
                  setFinishedGame(false);
                  dispatch(actualBetActions.setActualBet(1));
                  dispatch(startedGameActions.setStartedGame(true));

                  if (actualBalance === 0) {
                    dispatch(actualBalanceActions.setActualBalance(10));
                  }
                }}
              >
                New game
              </button>
            </div>
          )}

          {youPushed && (
            <div className="gamePage__notification notification is-success">
              Push!

              <button
                type="button"
                className="gamePage__button button is-info"
                onClick={() => {
                  setYouPushed(false);
                  setFinishedGame(false);
                  dispatch(actualBetActions.setActualBet(1));
                  dispatch(actualBalanceActions.setActualBalance(actualBalance + actualBet));
                  dispatch(startedGameActions.setStartedGame(true));
                }}
              >
                New game
              </button>
            </div>
          )}

          {youWon && (
            <div className="gamePage__notification notification is-success">
              {bj && (<p>Black Jack!!!</p>)}

              <p>You win!</p>

              <button
                type="button"
                className="gamePage__button button is-info"
                onClick={() => {
                  setFinishedGame(false);
                  dispatch(actualBetActions.setActualBet(1));
                  dispatch(actualBalanceActions.setActualBalance(actualBalance + actualBet * 2));
                  dispatch(startedGameActions.setStartedGame(true));
                  setYouWon(false);
                  setBj(false);
                }}
              >
                New game
              </button>
            </div>
          )}
          <div className="gamePage">
            <h1 className="gamePage__title">Black Jack</h1>

            {!startedGame && (
              <div
                className="gamePage__cards"
              >
                <DealerCards cards={dealerCards} sum={dealerSum} />

                <MyCards cards={myCards} sum={mySum} />
              </div>
            )}

            <div className="gamePage__buttons">
              {startedGame
                ? (
                  <div className="gamePage__deal">
                    <button
                      type="button"
                      className="gamePage__button button is-success is-medium"
                      onClick={() => {
                        dispatch(startedGameActions.setStartedGame(false));
                        dispatch(actualBalanceActions.setActualBalance(actualBalance - actualBet));
                        buildDeck();
                      }}
                    >
                      Deal
                    </button>

                    <p className="gamePage__text">Place your bet</p>
                  </div>
                )
                : (
                  <>
                    <button
                      type="button"
                      className="gamePage__button button is-success is-medium"
                      disabled={finishedGame || bj}
                      onClick={() => hit()}
                    >
                      Hit
                    </button>
                    <button
                      type="button"
                      className="gamePage__button button is-warning is-medium"
                      onClick={() => {
                        setFinishedGame(true);
                        openHiddenCard();
                      }}
                      disabled={finishedGame || bj}
                    >
                      Stand
                    </button>
                  </>
                )}
            </div>

            <Bets />
          </div>
        </>
      )
  );
};
