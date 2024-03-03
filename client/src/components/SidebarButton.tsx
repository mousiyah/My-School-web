import React from 'react';
import { IconType } from 'react-icons';

interface SidebarButtonProps {
  icon: IconType;
  name: string;
  selected?: boolean;
  showText?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon: Icon, name, selected = false, showText = true }) => {
  return (
    <button
      className={`w-full flex items-center py-3 px-4 rounded-r hover:bg-gray-100 ${
        selected ? 'bg-primary text-white' : ''
      }`}
    >
      <Icon size={20} className={`mr-6 ${selected ? 'text-white' : 'text-gray-500'}`} />
      {showText && <span className={`text-gray-800 font-medium text-sm ${selected ? 'text-white' : ''}`}>{name}</span>}
    </button>
  );
};

export default SidebarButton;
