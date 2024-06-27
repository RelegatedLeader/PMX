import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/PayMeXApp.css';

export default function PayMeXApp() {
  const location = useLocation();
  const { firstname, lastname, email, currCash, currBitcoin } =
    location.state || {};

  const navigate = useNavigate();

  const convertCrypto = () => {
    navigate('/convert_crypto', {
      state: {
        firstname: firstname,
        lastName: lastname,
        email: email,
        currCash: currCash,
        currBitcoin: currBitcoin,
      },
    });
  };

  const useCrypto = () => {
    navigate('/use_crypto');
  };

  return (
    <Container className='paymex-app-container'>
      <Card className='text-center'>
        <Card.Header>
          <h1>WELCOME TO PAYMEX{firstname ? `, ${firstname}` : ''}</h1>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Account Details</strong>
            <br />
            Name: {firstname} {lastname}
            <br />
            Email: {email}
            <br />
            Current Cash: ${currCash}
            <br />
            Current Bitcoin: {currBitcoin} BTC
          </Card.Text>
          <Button variant='primary' onClick={convertCrypto} className='m-2'>
            Convert Crypto
          </Button>
          <Button variant='secondary' onClick={useCrypto} className='m-2'>
            Use Crypto
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
