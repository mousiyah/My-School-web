import React, { useState } from 'react';
import axios from 'axios';

import { login } from '../utils/auth';

import InputBox from '../components/InputWithIcon.tsx';

import Logo from '../components/Logo.tsx';
import visual from '../assets/visual_login.png';
import { FaArrowLeft } from "react-icons/fa";
import { MdEmail, MdLock } from 'react-icons/md';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return false;
    }
    setError('');
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('user-exists', { email });
      if (response.data.exists) {
        setUserExists(true);
      } else {
        setError('User with this email does not exist');
      }
    } catch (error) {
      console.error('Error checking email:', error.message);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    try {
      const response = await axios.post('login', { email, password });
      console.log('Login successful');
      setLoginSuccess(true);
      setError('Login successful');

      login(response.data.token);
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.response.data.error || 'Login failed. Please try again.');
    }
  };

  const handleEditEmail = () => {
    setError('');
    setLoginSuccess(false);
    setUserExists(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-fit text-center p-4">
        <img src={visual} alt="School" className="w-1/3 mx-auto" />
        <Logo size={4.5}/>

        <form onSubmit={userExists ? handleLogin : handleEmailSubmit}>

          {userExists ? (

            <div>
              <div className="text-left">
                <button type="button" onClick={handleEditEmail}>
                  <div className="flex ml-2 items-center text-second">
                    <FaArrowLeft />
                    <p className="mb-0 ml-4 text-base text-gray-600">{email}</p>
                  </div>
                </button>
              </div>
              
              <InputBox
                icon={<MdLock/>}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          ) : (

            <InputBox
              icon={<MdEmail/>}
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          )}

          {error && <p className={`${loginSuccess ? 'text-green-600' : 'text-red-600'} mt-4`}>{error}</p>}

          {!userExists && (
            <button type="submit" className="btn-primary mt-2">Next</button>
          )}

          {userExists && (
            <button type="submit" className="btn-primary mt-2">Login</button>
          )}
        </form>

        <div className="mt-4">
          <span className="text-gray-600">Forgot password? </span>
          <a href="#" className="text-primary hover:underline">Reset</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
