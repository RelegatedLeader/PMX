import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //the browserr router helped fix it
import LoginMenu from './Login_Menu/LoginMenu';
import LinkBank from './Login_Menu/LinkBank';
import Login from './Login_Menu/Login';
import SignUp from './Login_Menu/SignUp';
import RandomWordsPage from './Login_Menu/RandomWordsPage';
import PayMe_X from './PayMe-X/PayMex_app';
import PayMe_X_app from './PayMe-X/PayMex_app';
import { useState } from 'react';
import Bank from './Bank_System/Bank';
import GenerateBankLinks from './Bank_System/GenerateBankLinks';
import SignUp_WB from './Bank_System/SignUp_WB';
import UseCrypto from './PayMe-X/UseCrypto';
import ConvertCrypto from './PayMe-X/ConvertCrypto';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='use_crypto' element={<UseCrypto />}></Route>
          <Route path='convert_crypto' element={<ConvertCrypto />}></Route>

          <Route path='signup_wb' element={<SignUp_WB />}></Route>
          <Route
            path='/generate_bank_links'
            element={<GenerateBankLinks />}
          ></Route>
          <Route path='/bank' element={<Bank />} />
          <Route path='/paymex_app' element={<PayMe_X_app />}></Route>
          <Route path='/randomWordsPage' element={<RandomWordsPage />} />
          <Route path='/sign_up' element={<SignUp />} />
          <Route path='/link_bank' element={<LinkBank />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<LoginMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
