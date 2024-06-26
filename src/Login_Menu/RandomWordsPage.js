import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../CSS/RandomWordsPage.css'; // Import CSS file for styling

export default function RandomWordsPage() {
  const [randomWords, setRandomWords] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { first_name, last_name, email, password, currCash, currBitcoin } =
    location.state || {
      first_name: 'John',
      last_name: 'Doe',
      email: 'Unknown User',
      words: [],
      currCash: 0.0,
      currBitcoin: 0.0,
    };

  const words = [
    'apple',
    'book',
    'car',
    'dog',
    'eagle',
    'forest',
    'guitar',
    'house',
    'ice',
    'jungle',
    'kangaroo',
    'lamp',
    'mountain',
    'notebook',
    'ocean',
    'piano',
    'quartz',
    'robot',
    'sun',
    'tree',
    'umbrella',
    'volcano',
    'whale',
    'xylophone',
    'yacht',
    'zebra',
    'airplane',
    'banana',
    'cloud',
    'dolphin',
    'elephant',
    'flower',
    'galaxy',
    'honey',
    'island',
    'jacket',
    'kite',
    'lion',
    'moon',
    'nest',
    'owl',
    'penguin',
    'quill',
    'river',
    'star',
    'turtle',
    'unicorn',
    'vase',
    'wind',
    'x-ray',
    'yellow',
    'zipper',
    'asteroid',
    'bridge',
    'castle',
    'diamond',
    'engine',
    'fire',
    'glacier',
    'horse',
    'ink',
    'jewel',
    'kangaroo',
    'leaf',
    'machine',
    'night',
    'octopus',
    'planet',
    'queen',
    'rocket',
    'snow',
    'thunder',
    'underwater',
    'valley',
    'wizard',
    'xenon',
    'yawn',
    'zephyr',
    'amethyst',
    'beach',
    'canyon',
    'desert',
    'emerald',
    'falcon',
    'giant',
    'harbor',
    'iguana',
    'jungle',
    'koala',
    'light',
    'meadow',
    'nebula',
    'oasis',
    'pearl',
    'quasar',
    'rain',
    'shadow',
    'temple',
    'utopia',
    'vortex',
  ];

  const saveWordsToFile = (words) => {
    const fileContent = words.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security_words.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const generateRandomWords = () => {
    let randomWordsArray = [];

    for (let i = 0; i < 8; i++) {
      randomWordsArray.push(words[Math.floor(Math.random() * words.length)]);
    }
    setRandomWords(randomWordsArray);

    const users = JSON.parse(localStorage.getItem('user_database')) || [];

    const yourSecurityCode = randomWordsArray;

    saveWordsToFile(yourSecurityCode);

    alert(
      'Make sure to add your username or something to the text file remember your code by.'
    );

    users.push({
      first_name,
      last_name,
      email,
      password,
      yourSecurityWords: yourSecurityCode,
      currCash,
      currBitcoin,
    });
    localStorage.setItem('user_database', JSON.stringify(users));
    alert(
      'User registered successfully. Sign up Bonus has been awarded! (100 USD)'
    );

    navigate('/'); // Navigate to the menu
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    alert('Local storage has been cleared.');
  };

  return (
    <div className='random-words-container'>
      <h1>Security Words</h1>
      <h4>
        The following are your security words that only belong to you and you
        will need them to sign in when signed out. Please do not share these
        with anyone and secure them in a private space.
      </h4>
      <button onClick={generateRandomWords}>Generate Security Words</button>
      <h3>Your Security Words:</h3>
      <ul>
        {randomWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      <br />
      <button
        onClick={clearLocalStorage}
        style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
      >
        Clear Local Storage
      </button>
    </div>
  );
}
