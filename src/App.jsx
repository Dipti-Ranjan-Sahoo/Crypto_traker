import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoList from './Components/CryptoList';
import CoinDetails from './Components/CoinDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="appContainer">
        <h1>Crypto Tracker</h1>
        <Routes>
          <Route path="/" element={<CryptoList />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
