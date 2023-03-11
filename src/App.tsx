import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Main } from './components/Main';
import img from './images/1.png';

export const App: React.FC = () => {
  return (
    <div className="app">
      <img src={img} alt="Img" className="image" />
      <Header />
      <Main />
    </div>
  );
};
