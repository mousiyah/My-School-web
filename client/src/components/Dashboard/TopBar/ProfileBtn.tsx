import React, { useState, useRef, useEffect } from 'react';
import { useClickOutside } from 'hooks/useClickOutside';
import { IoIosArrowDown } from "react-icons/io";

import { authApi } from 'api/authApi';

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface ProfileBtnProps {
  dropdownItems: DropdownItem[];
}

const ProfileBtn: React.FC<ProfileBtnProps> = ({ dropdownItems }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    const userEmail = await authApi.getUserEmail();
    setUserEmail(userEmail);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useClickOutside(ref, closeDropdown);

  return (
    <div ref={ref} className="ml-auto relative">
      <button className="btn btn-primary rounded-lg text-white" type="button" onClick={toggleDropdown}>
  <div className="flex items-center">
    <span className="mr-2 hidden lg:inline">{userEmail}</span>
    <span className="mr-2 lg:hidden">{userEmail.charAt(0)}</span>
    <IoIosArrowDown />
  </div>
</button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 p-0 bg-white rounded-lg shadow text-gray-600 z-20">
          {dropdownItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`block px-7 py-2 hover:bg-gray-100 lg w-full text-left
                ${index === 0 ? 'pt-3 rounded-t-lg' : ''}
                ${index === dropdownItems.length - 1 ? 'pb-3 rounded-b-lg' : ''} `}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
