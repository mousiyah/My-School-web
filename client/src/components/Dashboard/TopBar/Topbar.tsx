import React, { useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "hooks/useNavigate";
import ProfileBtn from "./ProfileBtn";
import Logo from "components/Logo";
import { MdMenu } from "react-icons/md";
import ThemeController from "./ThemeController";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { logout } = useAuth();
  const { navigateToLogin } = useNavigate();
  const [theme, setTheme] = useState<string>(() => {
    // Initialize theme from local storage or use "light" as default
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Save theme preference to local storage
    localStorage.setItem("theme", theme);
    // Update data-theme attribute of html element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const onLogoutClick = () => {
    logout();
    navigateToLogin();
  };

  const ProfileBtnDropdownItems = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    { label: "Logout", onClick: onLogoutClick },
  ];

  return (
    <nav className="w-full border-box px-4 py-1/2 border-b border-gray-300 relative">
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center">
          {/* Hamburger */}
          <div>
            <button
              onClick={onToggleSidebar}
              className="text-gray-600 hover:bg-gray-100 rounded-full p-2.5"
            >
              <MdMenu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="ml-4">
            <Logo size={2.6} />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          {/* Theme Controller */}
          <div className="mr-4">
            <ThemeController initialTheme="light" />
          </div>

          {/* Profile Dropdown Button */}
          <ProfileBtn dropdownItems={ProfileBtnDropdownItems} />
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
