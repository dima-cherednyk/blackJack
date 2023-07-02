import React from 'react';
import './MyCards.scss';

type Props = {
  cards: string[],
  sum: number,
};

export const MyCards:React.FC<Props> = ({ cards, sum }) => {
  return (
    <div className="myCards">
      <div className="myCards__text">
        <h3>My cards</h3>

        <p>{sum}</p>
      </div>

      <div className="myCards__cards">
        {cards.map(card => (
          <img
            key={card}
            src={`./images/cards/${card}.png`}
            alt="card"
            className="myCards__card"
          />
        ))}
      </div>
    </div>
  );
};
