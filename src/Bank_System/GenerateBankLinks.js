import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import '../CSS/GenerateBankLinks.css'; // Import CSS file for styling

export default function GenerateBankLinks() {
  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [email, set_email] = useState('');
  const [encryptedLink, set_encryptedLink] = useState('');
  // const [decryptedData, set_decryptedData] = useState(null);
  const [copySuccess, set_copySuccess] = useState('');

  const secretKey = 'your-secret-key'; // Use a secure key for encryption and decryption

  function encrypt_link() {
    const data = { first_name, last_name, email };
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    const link = `http://example.com?data=${encodeURIComponent(encryptedData)}`;

    set_encryptedLink(link);
    // decrypt_link(link); <-- testing purposes only
  }

  function copy_to_clipboard() {
    navigator.clipboard.writeText(encryptedLink).then(
      () => {
        set_copySuccess('Link copied!');
      },
      (err) => {
        set_copySuccess('Failed to copy link');
      }
    );
  }

  /** function decrypt_link(encryptedLink) {
    const urlParams = new URLSearchParams(new URL(encryptedLink).search);
    const encryptedData = urlParams.get('data');
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    set_decryptedData(decryptedData);
  } */

  return (
    <div className='generate-bank-links-container'>
      <h1>Generate Bank Links</h1>
      <h3>
        Do not enter REAL INFORMATION, you will be given an encrypted link to be
        decrypted in the next level.
      </h3>
      <label htmlFor='first_name'> First Name</label>
      <input
        type='text'
        required
        id='first_name'
        value={first_name}
        onChange={(e) => set_first_name(e.target.value)}
      ></input>
      <br />
      <label htmlFor='last_name'> Last Name</label>
      <input
        type='text'
        required
        id='last_name'
        value={last_name}
        onChange={(e) => set_last_name(e.target.value)}
      ></input>
      <br /> <label htmlFor='email'> Email</label>
      <input
        type='text'
        required
        id='email'
        value={email}
        onChange={(e) => set_email(e.target.value)}
      ></input>
      <br />
      <button onClick={encrypt_link}>Encrypt </button>
      {encryptedLink && (
        <div>
          <h5>
            This is your encrypted link:{' '}
            <a href={encryptedLink} target='_blank' rel='noopener noreferrer'>
              {encryptedLink}
            </a>
            <br />
            <button onClick={copy_to_clipboard}>Copy Link</button>
            {copySuccess && (
              <span style={{ marginLeft: '10px' }}>{copySuccess}</span>
            )}
          </h5>
        </div>
      )}
      <br />
      {/** {decryptedData && (
        <div>
          <h5>This is your decrypted data:</h5>
          <p>First Name: {decryptedData.first_name}</p>
          <p>Last Name: {decryptedData.last_name}</p>
          <p>Email: {decryptedData.email}</p>
        </div>
      )} */}
    </div>
  );
}
