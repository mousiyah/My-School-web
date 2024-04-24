import React from "react";
import { IconType } from "react-icons";

interface SidebarButtonProps {
  icon: IconType;
  name: string;
  selected?: boolean;
  showText?: boolean;
  onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  name,
  selected = false,
  showText = true,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center py-3 px-6 rounded-r-lg 
                  ${selected ? "bg-primary" : "hover:bg-gray-100"}`}
    >
      <Icon size={20} className={`${selected ? "text-white" : ""}`} />

      {showText && (
        <span
          className={`font-medium text-sm ml-6 
                      ${selected ? "text-white" : ""}`}
          style={{ opacity: showText ? 1 : 0 }}
        >
          {name}
        </span>
      )}
    </button>
  );
};

export default SidebarButton;
