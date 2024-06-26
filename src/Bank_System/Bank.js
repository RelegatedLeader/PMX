import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Bank.css'; // Import CSS file for styling

export default function Bank() {
  // const [link, setLink] = useState('');

  return (
    <div className='bank-container'>
      <h1> Bank System</h1>
      <h3>
        The idea of this system is to turn your bank account information into a
        cryptography based link and then you are given an 8 word security after
        your information has been taken from that link and saved onto the
        PayMe-X system. I will keep it simple here and only allow examples of
        links that one can choose from and allow the user to sign in with the
        words generated from the data scrapped from the link. This is more like
        a show and tell. The idea is to show the idea...
      </h3>
      <br />
      <Link to='/generate_bank_links'>
        <button> Generate Bank Links</button>
      </Link>
      <br /> <br />
      <Link to='/link_bank'>
        <button> Link Bank Account (Generate a bank link above first!)</button>
      </Link>
    </div>
  );
}
