import React, { useState } from 'react';
import './RegisterNewUser.scss';
import { useAppDispatch } from '../../app/hooks';
import { actions as actualUserActions } from '../../features/actualUser';

export const RegisterNewUser: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const signIn = () => {
    if (playerName.length < 4) {
      return setError('Your name have less than 4 characters!');
    }

    return dispatch(actualUserActions.setActualUser(
      {
        userName: playerName,
        money: 100,
      },
    ));
  };

  return (
    <div className="registerNewUser">
      <div>Sign up new player!</div>

      <input
        type="text"
        className="input"
        placeholder="Enter your name"
        minLength={4}
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
          setError('');
        }}
      />

      <button
        type="button"
        className="button is-primary"
        onClick={() => signIn()}
      >
        Sign up
      </button>

      {error && (
        <div className="notification is-warning registerNewUser__notification">
          {error}
        </div>
      )}
    </div>
  );
};
