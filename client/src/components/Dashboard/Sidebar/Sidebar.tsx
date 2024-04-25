import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "hooks/useNavigate";
import { USER_ROLES } from "constants/roles";

import { IoBookOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { PiNotebook } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { CiMail } from "react-icons/ci";

import SidebarButton from "./SidebarBtn";

interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [selected, setSelected] = useState<string>("Diary");

  const userRole = useSelector((state: RootState) => state.user.role);

  const {
    navigateToDiary,
    navigateToHomeworks,
    navigateToSubjects,
    navigateToAnnouncements,
    navigateToInbox,
  } = useNavigate();

  const handleItemClick = (
    sectionName: string,
    navigateFunction: () => void
  ) => {
    setSelected(sectionName);
    navigateFunction();
  };

  const sidebarItems = [
    {
      icon: IoBookOutline,
      name: "Diary",
      onClick: () => handleItemClick("Diary", navigateToDiary),
    },

    ...(userRole === USER_ROLES.STUDENT
      ? [
          {
            icon: GoTasklist,
            name: "Homeworks",
            onClick: () => handleItemClick("Homeworks", navigateToHomeworks),
          },
        ]
      : []),

    ...(userRole === USER_ROLES.STUDENT
      ? [
          {
            icon: PiNotebook,
            name: "Subjects",
            onClick: () => handleItemClick("Subjects", navigateToSubjects),
          },
        ]
      : []),

    {
      icon: GoCommentDiscussion,
      name: "Announcements",
      onClick: () => handleItemClick("Announcements", navigateToAnnouncements),
    },

    {
      icon: CiMail,
      name: "Inbox",
      onClick: () => handleItemClick("Inbox", navigateToInbox),
    },
  ];

  return (
    <div
      className={`overflow-y-auto h-full border-box 
                  bg-base-100 py-2 pr-2 border-r border-gray-300
                  transition-all duration-100 ease-in-out
                  ${
                    isOpen
                      ? "w-64 lg:w-64 sm:w-64 shrink-0 fixed left-0 z-50 lg:relative lg:static lg:z-auto"
                      : "w-24"
                  }`}
    >
      {sidebarItems.map((item, index) => (
        <SidebarButton
          key={index}
          icon={item.icon}
          name={item.name}
          selected={selected === item.name}
          showText={isOpen}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default Sidebar;
