import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function LoginMenu() {
  function clear_local_storage() {
    localStorage.clear();
    alert('Your local storage has been cleared...');
  }

  return (
    <Container className='login-menu-container'>
      <h1>PayMe-X</h1>
      <Link to='/login'>
        <Button className='custom-button'>Log in</Button>
      </Link>
      <br />
      <Link to='/bank'>
        <Button className='custom-button'>Link Bank Account</Button>
      </Link>
      <br />
      <Link to='/sign_up'>
        <Button className='custom-button'>Sign Up</Button>
      </Link>
      <br />
      <Button className='custom-button' onClick={clear_local_storage}>
        Clear Local Storage Data
      </Button>
    </Container>
  );
}
