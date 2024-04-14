import React from 'react';
import { useNavigate } from 'hooks/useNavigate';
import Logo from './Logo';

const NotFound: React.FC = () => {

  const { navigateToDashboard } = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo size={4} />
      <h1 className="mt-8 text-3xl font-bold text-gray-800">404</h1>
      <h1 className="mt-8 text-3xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-600 mb-10">Sorry, the page you are looking for does not exist.</p>
      <button className="btn btn-primary" onClick={navigateToDashboard}>Return Home</button>
    </div>
  );
};

export default NotFound;
