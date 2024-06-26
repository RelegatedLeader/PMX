import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Login.css'; // Assuming you'll create a CSS file for custom styles

export default function Login({ onLogin }) {
  const [email_value, set_email_value] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [securityWords, setSecurityWords] = useState(Array(8).fill(''));
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const newSecurityWords = [...securityWords];
    newSecurityWords[index] = event.target.value;
    setSecurityWords(newSecurityWords);
  };

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem('user_database')) || [];
    const currentUser = users.find(
      (user) =>
        JSON.stringify(user.yourSecurityWords) === JSON.stringify(securityWords)
    );

    if (currentUser) {
      setLoginSuccessful(true);
      setLoginMessage('Login successful!');

      const currentUserFirstName = currentUser.first_name;
      const currentUserLastName = currentUser.last_name;
      const currentUserEmail = currentUser.email;
      const currentUserCash = currentUser.currCash;
      const currBitcoin = currentUser.currBitcoin;

      navigate('/paymex_app', {
        state: {
          firstname: currentUserFirstName,
          lastname: currentUserLastName,
          email: currentUserEmail,
          currCash: currentUserCash,
          currBitcoin: currBitcoin,
        },
      });
    } else {
      setLoginSuccessful(false);
      setLoginMessage('Invalid security code. Please try again.');
    }
  };

  return (
    <Container className='login-container'>
      <h1 className='text-white text-center'>PayMe-X</h1>
      <h3 className='text-white text-center'>
        Please enter your 8-word security code to login
      </h3>
      <Form>
        <Row>
          {securityWords.map((word, index) => (
            <Col xs={12} md={6} key={index} className='mb-3'>
              <Form.Group controlId={`word-${index}`}>
                <Form.Label className='text-white'>
                  Enter word {index + 1}
                </Form.Label>
                <Form.Control
                  type='text'
                  value={word}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button variant='primary' onClick={handleSubmit} className='w-100'>
          Submit words
        </Button>
      </Form>
      {loginMessage && (
        <Alert
          variant={loginSuccessful ? 'success' : 'danger'}
          className='mt-3'
        >
          {loginMessage}
        </Alert>
      )}
    </Container>
  );
}
