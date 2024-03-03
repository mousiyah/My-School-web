import React from 'react';
import Logo from '../components/Logo';
import { MdMenu } from 'react-icons/md';

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav className="w-full px-4 py-1/2 border-b border-gray-300">
      <div className="flex items-center">
        {/* Hamburger */}
        <div>
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 hover:bg-gray-100 rounded-full p-2.5"
          >
            <MdMenu size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="ml-4">
          <Logo size={2.6} />
        </div>

        {/* Profile */}
        <div className="ml-auto">
          <button className="btn-primary btn-round">M</button>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;