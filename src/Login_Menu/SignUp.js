import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/SignUp.css'; // Import CSS file for styling

export default function SignUp() {
  const navigate = useNavigate();

  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [same_password, set_same_password] = useState('');

  const sign_up_bonus = 100;

  const validate_data = () => {
    if (same_password !== password) {
      alert('The passwords do not match...');
      return;
    }

    if (!first_name || !last_name || !email || !password || !same_password) {
      alert('Please enter all required information.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('user_database')) || [];

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert('That email is already registered...');
      return;
    }

    const currCash = sign_up_bonus;
    const currBitcoin = currCash / 68789;

    // Register new user
    users.push({
      first_name,
      last_name,
      email,
      password,
      currCash,
      currBitcoin,
    });

    localStorage.setItem('user_database', JSON.stringify(users));

    // Clear input fields after successful registration
    set_first_name('');
    set_last_name('');
    set_email('');
    set_password('');
    set_same_password('');

    // Navigate to randomWordsPage with user data
    navigate('/randomWordsPage', {
      state: {
        first_name,
        last_name,
        email,
        password,
        currCash,
        currBitcoin,
      },
    });
  };

  return (
    <div className='signup-container'>
      <h1>We're glad you're here!</h1>
      <h4>
        We only need some data from you, after you click the "Sign Up" button,
        it will not exist past here.
      </h4>

      <label htmlFor='first_name'>First Name</label>
      <input
        type='text'
        required
        id='first_name'
        value={first_name}
        onChange={(e) => set_first_name(e.target.value)}
      />
      <br />

      <label htmlFor='last_name'>Last Name</label>
      <input
        type='text'
        required
        id='last_name'
        value={last_name}
        onChange={(e) => set_last_name(e.target.value)}
      />
      <br />

      <label htmlFor='email'>Email</label>
      <input
        type='email'
        required
        id='email'
        value={email}
        onChange={(e) => set_email(e.target.value)}
      />
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
