import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/ConvertCrypto.css'; // Import CSS file for styling

const BITCOIN_PRICE = 68900; // Price of 1 Bitcoin in dollars

export default function ConvertCrypto() {
  const location = useLocation();
  const { firstname, lastName, email } = location.state || {};

  // State to manage current cash and bitcoin amounts
  const [currCash, setCurrCash] = useState(0);
  const [currBitcoin, setCurrBitcoin] = useState(0);

  const [showBetaMessage, setShowBetaMessage] = useState(false);
  const [showTradeMessage, setTradeMessage] = useState(false);
  const [tradeValue, setTradeValue] = useState(0);
  const [addFundsValue, setAddFundsValue] = useState(0);

  // Load user data from local storage on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user_database')) || [];
    const currentUser = users.find((user) => user.email === email);

    if (currentUser) {
      setCurrCash(parseFloat(currentUser.currCash));
      setCurrBitcoin(parseFloat(currentUser.currBitcoin));
    }
  }, [email]); // Depend on email to refresh data when location state changes

  const trade_cash_to_crypto = () => {
    // Functionality for trading cash to crypto
    setTradeMessage(true);
  };

  const add_funds = () => {
    setShowBetaMessage(true); // Show the beta mode message
  };

  const trade_it = () => {
    // Function to handle the trade process
    if (tradeValue > currCash) {
      alert('You do not have enough funds...');
    } else if (tradeValue <= 0) {
      alert('Please enter a positive amount to trade.');
    } else {
      // Calculate updated cash and bitcoin amounts
      const updatedCash = parseFloat(currCash) - parseFloat(tradeValue);
      const updatedBitcoin =
        parseFloat(currBitcoin) + parseFloat(tradeValue) / BITCOIN_PRICE;

      // Update local storage
      const users = JSON.parse(localStorage.getItem('user_database')) || [];
      const updatedUsers = users.map((user) => {
        if (user.email === email) {
          return {
            ...user,
            currCash: updatedCash.toFixed(2), // Ensure cash is formatted as a string with 2 decimal places
            currBitcoin: updatedBitcoin.toFixed(8), // Ensure bitcoin is formatted as a string with 8 decimal places
          };
        }
        return user;
      });

      localStorage.setItem('user_database', JSON.stringify(updatedUsers));

      // Update state to reflect changes
      setCurrCash(updatedCash);
      setCurrBitcoin(updatedBitcoin);
      setTradeMessage(false);
      setTradeValue(0);
    }
  };

  const handleAddFunds = () => {
    // Simulate adding funds (for demo purposes)
    const addedFunds = parseFloat(addFundsValue);
    if (isNaN(addedFunds) || addedFunds <= 0) {
      alert('Please enter a valid amount to add funds.');
      return;
    }

    // Update local storage and state
    const updatedCash = parseFloat(currCash) + addedFunds;
    const users = JSON.parse(localStorage.getItem('user_database')) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        return {
          ...user,
          currCash: updatedCash.toFixed(2), // Ensure cash is formatted as a string with 2 decimal places
        };
      }
      return user;
    });

    localStorage.setItem('user_database', JSON.stringify(updatedUsers));
    setCurrCash(updatedCash);
    setAddFundsValue(0); // Reset input field after adding funds
  };

  return (
    <div className='convert-crypto-container'>
      <h1> Convert your $$$ to crypto! </h1>
      <h4>
        {firstname} {lastName}, You have ${currCash.toFixed(2)} which is{' '}
        {currBitcoin.toFixed(8)} in Bitcoin
      </h4>

      <br />
      <button className='action-button' onClick={trade_cash_to_crypto}>
        {' '}
        Trade
      </button>
      <br />
      <button className='action-button' onClick={add_funds}>
        {' '}
        Add funds to trade
      </button>

      {showTradeMessage && (
        <div className='trade-section'>
          <label> How much do you want to trade? </label>
          <input
            type='number'
            id='cash_to_crypto'
            required
            className='input-field'
            onChange={(e) => setTradeValue(e.target.value)}
            value={tradeValue}
          />
          <button className='action-button' onClick={trade_it}>
            {' '}
            Trade it{' '}
          </button>
        </div>
      )}

      {showBetaMessage && (
        <div className='add-funds-section'>
          <h2>
            Keeping this Website in Beta Mode, this function would allow the
            user to link other crypto wallets to add funds (with this being a
            cryptowallet itself)... , the link bank option in the menu allows
            the user to have access to that money and turn it into crypto with
            the "Trade" button, but that won't be worked in this beta website.
            This website is only to show the basic idea of PayMe-X.
          </h2>
          <h4>
            But we can pretend we are adding funds (Just for the sake of
            trading):
          </h4>
          <label htmlFor='add_funds_value'> Add funds</label>
          <input
            type='number'
            id='add_funds_value'
            className='input-field'
            value={addFundsValue}
            onChange={(e) => setAddFundsValue(e.target.value)}
          />
          <button className='action-button' onClick={handleAddFunds}>
            {' '}
            Add Funds{' '}
          </button>
        </div>
      )}
    </div>
  );
}
