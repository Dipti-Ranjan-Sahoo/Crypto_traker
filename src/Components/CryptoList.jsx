import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CryptoList.css';

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false
          }
        });
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="cryptoListContainer">
      <h2>Top Cryptocurrencies</h2>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id} className="cryptoItem">
            <Link to={`/coin/${coin.id}`} className="cryptoLink">
              <img src={coin.image} alt={coin.name} className="coinImage" />
              <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              <span>${coin.current_price}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;