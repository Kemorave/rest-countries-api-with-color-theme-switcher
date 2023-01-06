import { useContext, useState } from "react";

import { ThemeContext } from "../contexts/theme-context";
import { BsMoon,IoMoonSharp } from "react-icons/all";
function Toggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
  };
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={handleThemeChange}
    >
      <div className="flex   items-center gap-2">
        {theme==='dark'?<IoMoonSharp/>:<BsMoon />}
        <p className="font-semibold text-sm">Dark mode</p>
      </div>
    </button>
  );
}

export default Toggle;
