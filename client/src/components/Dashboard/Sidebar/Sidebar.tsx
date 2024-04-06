import React, { useState } from 'react';

import { AiOutlineHome } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { PiNotebook } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { CiMail } from "react-icons/ci";

import SidebarButton from './SidebarBtn';

interface SidebarProps {
  isOpen?: boolean;
  onSidebarClick: (itemName: string) => void;
  selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarClick, selectedSection}) => {

  const sidebarItems = [
    { icon: AiOutlineHome, name: 'Home' },
    { icon: IoBookOutline, name: 'Diary' },
    { icon: GoTasklist, name: 'Homeworks' },
    { icon: PiNotebook, name: 'Lessons' },
    { icon: GoCommentDiscussion, name: 'Announcements' },
    { icon: CiMail, name: 'Inbox' },
  ];

  return (
    <div
      className={`overflow-y-auto h-full border-box bg-white py-2 pr-2 border-r border-gray-300
                  transition-all duration-100 ease-in-out
                  ${isOpen ? 'w-72' : 'w-24'}`}>

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
