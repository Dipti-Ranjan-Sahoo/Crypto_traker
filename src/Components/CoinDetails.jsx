import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CoinDetails.css';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoin(response.data);
      } catch (error) {
        console.error('Error fetching coin details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!coin) {
    return <div className="error">Coin not found</div>;
  }

  return (
    <div className="coinDetailsContainer">
      <Link to="/" className="backButton">Back</Link>
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <img src={coin.image.large} alt={coin.name} className="coinImage" />
      <p>Current Price: ${coin.market_data.current_price.usd}</p>
      <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
      <p>24h High: ${coin.market_data.high_24h.usd}</p>
      <p>24h Low: ${coin.market_data.low_24h.usd}</p>
      <p dangerouslySetInnerHTML={{ __html: coin.description.en.split(".")[0] + '.' }}></p>
    </div>
  );
};

export default CoinDetails;

