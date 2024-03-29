import React, { useState } from 'react';

import Logo from '../components/Logo.tsx';
import InputBox from '../components/InputWithIcon.tsx';

import visual from '../assets/visual_login.png';
import { MdEmail, MdLock } from 'react-icons/md';

import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('login', { email, password });
      setError("logged in", response.data.email);
      console.log('Login successful');
      // Redirect user to dashboard
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-fit text-center p-4">

        <img src={visual} alt="School" className="w-1/3 mx-auto" />

        <Logo size={4.5}/>

        <form onSubmit={handleLogin}>
          <InputBox
            icon={<MdEmail/>}
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputBox
            icon={<MdLock/>}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <button type="submit" className="btn-primary mt-2">Login</button>
        </form>

        <div className="mt-4">
          <span className="text-gray-600">Forgot password? </span>
          <a href="#" className="text-primary hover:underline">
            Reset
          </a>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
