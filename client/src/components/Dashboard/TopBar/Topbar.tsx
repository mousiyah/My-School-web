import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'hooks/useNavigate';

import ProfileBtn from './ProfileBtn';
import Logo from 'components/Logo';

import { MdMenu } from 'react-icons/md';
import { IoClose } from "react-icons/io5";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {

  const { logout } = useAuth();
  const { navigateToLogin } = useNavigate();

  const onLogoutClick = () => {
    logout();
    navigateToLogin();
  }

  const ProfileBtnDropdownItems = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    { label: "Logout", onClick:  onLogoutClick}
  ];

  return (
    <nav className="w-full border-box px-4 py-1/2 border-b border-gray-300 relative">
      <div className="flex items-center">

        {/* Hamburger */}
        <div>
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 hover:bg-gray-100 rounded-full p-2.5">
            <MdMenu size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="ml-4">
          <Logo size={2.6} />
        </div>

        {/* Profile Dropdown Button */}
        <ProfileBtn dropdownItems={ProfileBtnDropdownItems}/>

      </div>
    </nav>
  );
};

export default Topbar;
