import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';
import InputBox from './InputWithIcon';
import Logo from '../Logo.tsx';
import visual from '../../assets/visual_login.png';
import { FaArrowLeft } from "react-icons/fa";
import { MdEmail, MdLock } from 'react-icons/md';

const Login = () => {
  const { signin, userExists } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailEntered, setEmailEntered] = useState(false);
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

    if (await userExists(email)) {
      setEmailEntered(true);
    } else {
      setError('User with this email does not exist');
    }

  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    if (await signin(email, password)) {
      setLoginSuccess(true);
      setError('Login successful');
    } else {
      setError('Wrong password');
    }

  };

  const handleEditEmail = () => {
    setError('');
    setLoginSuccess(false);
    setEmailEntered(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-fit text-center p-4">
        <img src={visual} alt="School" className="w-1/3 mx-auto" />
        <Logo size={4.5}/>

        <form onSubmit={emailEntered ? handleLogin : handleEmailSubmit} autoComplete="on">

          {emailEntered ? (

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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          ) : (

            <InputBox
              icon={<MdEmail/>}
              placeholder="Email address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          )}

          {error && <p className={`${loginSuccess ? 'text-green-600' : 'text-red-600'} mt-4`}>{error}</p>}

          {!emailEntered && (
            <button type="submit" className="btn-primary mt-2">Next</button>
          )}

          {emailEntered && (
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

export default Login;
