import React from 'react';
import './DealerCards.scss';

type Props = {
  cards: string[],
  sum: number,
};

export const DealerCards: React.FC<Props> = ({ cards, sum }) => {
  return (
    <div className="dealerCards">
      <div className="dealerCards__text">
        <h3>Dealer cards</h3>

        <p>{sum}</p>
      </div>

      <div className="dealerCards__cards">
        {cards.map(card => (
          <img
            key={card}
            src={`./images/cards/${card}.png`}
            alt="firstCard"
            className="dealerCards__card"
          />
        ))}
      </div>
    </div>
  );
};
