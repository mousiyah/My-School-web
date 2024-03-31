import React, { useState } from 'react';

import { AiOutlineHome } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { PiNotebookLight } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { CiMail } from "react-icons/ci";

import SidebarButton from './SidebarButton';

interface SidebarProps {
  isOpen?: boolean;
  onSidebarClick: (itemName: string) => void;
  selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarClick, selectedSection}) => {

  const sidebarItems = [
    { icon: AiOutlineHome, name: 'Home' },
    { icon: IoBookOutline, name: 'Diary' },
    { icon: GoTasklist, name: 'Todo' },
    { icon: PiNotebookLight, name: 'Lessons' },
    { icon: GoCommentDiscussion, name: 'Announcements' },
    { icon: CiMail, name: 'Inbox' },
  ];

  return (
    <div
      className={`bg-white py-2 pr-2 border-r border-gray-300
                  transition-all duration-100 ease-in-out
                  ${isOpen ? 'w-72' : 'w-24'} h-full`}>

      {sidebarItems.map((item, index) => (
        <SidebarButton
          key={index}
          icon={item.icon}
          name={item.name}
          selected={selectedSection === item.name.toLowerCase()}
          showText={isOpen}
          onClick={() => onSidebarClick(item.name.toLowerCase())}
        />
      ))}

    </div>
  );
};

export default Sidebar;
