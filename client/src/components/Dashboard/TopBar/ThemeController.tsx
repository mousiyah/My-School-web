import React, { useState, useEffect } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";

interface ThemeControllerProps {
  initialTheme: string;
}

const ThemeController: React.FC<ThemeControllerProps> = ({ initialTheme }) => {
  const [theme, setTheme] = useState<string>(initialTheme);

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

  return (
    <label>
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="hidden"
      />

      {/* Sun Icon (visible when theme is dark) */}
      {theme === "dark" && <MdOutlineWbSunny size={24} />}

      {/* Moon Icon (visible when theme is light) */}
      {theme === "light" && <FaRegMoon size={24} />}
    </label>
  );
};

export default ThemeController;
