import React from 'react';
import { RegisterNewUser } from './components/RegisterNewUser/RegisterNewUser';
import { useAppSelector } from './app/hooks';
import { GamePage } from './components/GamePage/GamePage';
import './App.scss';

export const App: React.FC = () => {
  const { actualUser } = useAppSelector(state => state.actualUser);

  return (
    <div className="app">
      {!actualUser
        ? <RegisterNewUser />
        : <GamePage />}
    </div>
  );
};
