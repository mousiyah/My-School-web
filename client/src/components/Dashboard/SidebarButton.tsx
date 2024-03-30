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
      className={`w-full flex items-center py-3 px-4 rounded-r hover:bg-gray-100 
                  ${selected ? 'bg-primary' : ''}`}>
                    
      <Icon size={20} className={`${selected ? 'text-white' : 'text-gray-500'}`} />

      {showText && (
        <span
          className={`font-medium text-sm ml-6 
                      ${selected ? 'text-white' : 'text-gray-800'}
                      transition-all duration-300 ease-in-out`}
          style={{ opacity: showText ? 1 : 0 }}
        >
          {name}
        </span>
      )}

    </button>
  );
};


export default SidebarButton;
