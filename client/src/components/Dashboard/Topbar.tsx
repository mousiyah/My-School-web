import React, { useState, useRef, useEffect } from 'react';
import Logo from '../Logo';
import { useAuth } from '../../hooks/useAuth';

import { MdMenu } from 'react-icons/md';
import { IoIosArrowDown } from "react-icons/io";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current !== event.target
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);

    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <nav className="w-full px-4 py-1/2 border-b border-gray-300 relative">
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

        {/* Profile Dropdown Button */}
        <div className="ml-auto relative">

          <button
            ref={buttonRef}
            id="profileBtn"
            className="btn-primary btn-round flex items-center"
            type="button"
            onClick={toggleDropdown}>
            <span className="mr-2">M</span>
            <IoIosArrowDown />
          </button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute top-full right-0 z-10 mt-2 p-0 bg-white rounded-lg shadow text-gray-600">

              <button className="block px-7 py-2 pt-3 hover:bg-gray-100 rounded-t-lg w-full text-left">
                Profile
              </button>

              <button className="block px-7 py-2 hover:bg-gray-100 w-full text-left">
                Settings
              </button>

              <button 
                onClick={logout}
                className="block px-7 py-2 pb-3 hover:bg-gray-100 rounded-b-lg w-full text-left">
                Sign out
              </button>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Topbar;
