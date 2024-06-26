import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/LinkBank.css';

export default function LinkBank() {
  const [link, setLink] = useState('');
  const [decryptedData, set_decryptedData] = useState(null);
  const secretKey = 'your-secret-key'; // Use a secure key for encryption and decryption
  const [isDecrypted, setIsDecrypted] = useState(false);
  const navigate = useNavigate();

  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [email, set_email] = useState('');

  function decrypt_link() {
    try {
      const urlParams = new URLSearchParams(new URL(link).search);
      const encryptedData = urlParams.get('data');
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      set_decryptedData(decryptedData);
      setIsDecrypted(true);

      set_first_name(decryptedData.first_name);
      set_last_name(decryptedData.last_name);
      set_email(decryptedData.email);
    } catch (error) {
      alert('Invalid link or decryption failed.');
    }
  }

  function go_to_signUp() {
    navigate('/signup_wb', { state: { first_name, last_name, email } });
  }

  return (
    <Container className='link-bank-container'>
      <h1 className='text-white text-center'>Decrypting Your Link</h1>
      <p className='text-white text-center'>
        <strong>
          If you haven't yet, please encrypt your link in the step before this
          one.
        </strong>
      </p>
      <p className='text-white text-center'>
        That encryption is based on bank-provided links that can be used to
        harbor your data for safe use. The links are always deleted after 5 mins
        or after use once requested. It is based on cryptography.
      </p>
      <Form>
        <Form.Group controlId='bank_link'>
          <Form.Label className='text-white'>
            Please enter your bank generated link
          </Form.Label>
          <Form.Control
            type='text'
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' onClick={decrypt_link} className='mt-3'>
          Decrypt Link
        </Button>
      </Form>

      {decryptedData && (
        <Alert variant='info' className='mt-3'>
          <h5>This is your decrypted data:</h5>
          <p>First Name: {decryptedData.first_name}</p>
          <p>Last Name: {decryptedData.last_name}</p>
          <p>Email: {decryptedData.email}</p>
        </Alert>
      )}

      {isDecrypted && (
        <Button variant='success' onClick={go_to_signUp} className='mt-3'>
          Save Data to PayMe-X
        </Button>
      )}
    </Container>
  );
}
