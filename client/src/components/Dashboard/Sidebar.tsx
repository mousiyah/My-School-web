import React from 'react';

import { AiOutlineHome } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { PiNotebookLight } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { CiMail } from "react-icons/ci";

import SidebarButton from './SidebarButton';

interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen}) => {

  return (
    <div
      className={`bg-white py-2 pr-2 border-r border-gray-300
                  transition-all duration-100 ease-in-out
                  ${isOpen ? 'w-72' : 'w-24'} h-full`}>

      <SidebarButton icon={AiOutlineHome} name="Home" selected={false} showText={isOpen} />
      <SidebarButton icon={IoBookOutline} name="Diary" selected={true} showText={isOpen} />
      <SidebarButton icon={GoTasklist} name="To do" selected={false} showText={isOpen} />
      <SidebarButton icon={PiNotebookLight} name="Lessons" selected={false} showText={isOpen} />
      <SidebarButton icon={GoCommentDiscussion} name="Announcements" selected={false} showText={isOpen} />
      <SidebarButton icon={CiMail} name="Inbox" selected={false} showText={isOpen} />

    </div>
  );
};

export default Sidebar;
