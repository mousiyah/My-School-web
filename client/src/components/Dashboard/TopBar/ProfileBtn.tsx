import React, { useState, useRef } from 'react';
import { useClickOutside } from 'hooks/useClickOutside';

import { IoIosArrowDown } from "react-icons/io";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface ProfileBtnProps {
  dropdownItems: DropdownItem[];
}

const ProfileBtn: React.FC<ProfileBtnProps> = ({ dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useClickOutside(ref, closeDropdown);

  return (
    <div ref={ref} className="ml-auto relative">
      <button
        className="btn btn-primary btn-round"
        type="button"
        onClick={toggleDropdown}>
          <div className="flex items-center">
            <span className="mr-2">M</span>
            <IoIosArrowDown />
          </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 p-0 bg-white rounded-lg shadow text-gray-600">
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
