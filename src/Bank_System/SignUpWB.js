import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../CSS/SignUp_WB.css'; // Import CSS file for styling

export default function SignUp_WB() {
  const navigate = useNavigate();
  const location = useLocation();

  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [same_password, set_same_password] = useState('');
  // const [first_time, set_first_time] = useState(false); // allows the user to have cash ready to be traded
  const sign_up_bonus = 100;
  const currCash = sign_up_bonus;

  let first_time = false; //needs to be used

  function set_first_time() {
    first_time = true;
  }

  // Fetch data from location.state
  useEffect(() => {
    if (location.state) {
      set_first_name(location.state.first_name);
      set_last_name(location.state.last_name);
      set_email(location.state.email);
    }
  }, [location.state]);

  const validate_data = () => {
    if (same_password !== password) {
      alert('The passwords do not match...');
      return;
    }

    if (
      first_name === '' ||
      last_name === '' ||
      email === '' ||
      password === '' ||
      same_password === ''
    ) {
      alert('Please enter all required information.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('user_database')) || [];
    const user = users.find((user) => user.email === email);

    if (user) {
      alert('That email is already registered...');
      return;
    } else {
      // The user is created, let's make it first time --> true
      set_first_time(true);
      // Add the new user to local storage
      users.push({
        first_name,
        last_name,
        email,
        password,
        currCash,
        currBitcoin: currCash * 68789, // This can't be a constant
      });
      localStorage.setItem('user_database', JSON.stringify(users));
      alert(
        'User registered successfully. Sign up Bonus (100 USD) has been awarded!'
      );
    }

    // Clear input fields
    set_first_name('');
    set_last_name('');
    set_email('');
    set_password('');
    set_same_password('');

    // Navigate to the next page with necessary props
    navigate('/randomWordsPage', {
      state: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        currCash: sign_up_bonus,
        currBitcoin: currCash * 68789,
      },
    });
  };

  return (
    <div className='signup-wb-container'>
      <h2>You're already halfway there!</h2>
      <br />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        required
        id='password'
        value={password}
        onChange={(e) => set_password(e.target.value)}
      />
      <br />
      <label htmlFor='same_password'>Re-enter Password</label>
      <input
        type='password'
        required
        id='same_password'
        value={same_password}
        onChange={(e) => set_same_password(e.target.value)}
      />
      <br />
      <button onClick={validate_data}>Sign Up!</button>
    </div>
  );
}
