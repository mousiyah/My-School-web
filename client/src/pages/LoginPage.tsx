import React from 'react';

import Logo from '../components/Logo.tsx';
import InputBox from '../components/InputWithIcon.tsx';

import visual from '../assets/visual_login.png';
import { MdEmail, MdLock } from 'react-icons/md';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-fit text-center p-4">

        <img src={visual} alt="School" className="w-1/3 mx-auto" />

        <Logo size={4.5}/>

        <InputBox icon={<MdEmail/>} placeholder="Email address" type="text"/>
        <InputBox icon={<MdLock/>} placeholder="Password" type="password"/>

        <button className="btn-primary mt-4">Login</button>

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
