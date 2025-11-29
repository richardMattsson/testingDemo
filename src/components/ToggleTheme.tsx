import { useState } from "react";

import type { ThemeType } from "../../lib/type";

type ToggleThemeProps = {
  theme: "light" | "dark";
  updateTheme: (theme: React.SetStateAction<ThemeType>) => void;
};

function ToggleTheme({ theme, updateTheme }: ToggleThemeProps) {
  const [mode, setMode] = useState(theme);

  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
    updateTheme(mode === "dark" ? "light" : "dark");
  };
  return (
    <>
      <svg
        data-test="toggle-theme-icon"
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        height={40}
        width={40}
        viewBox="0 0 640 640"
        style={{ cursor: "pointer" }}
      >
        <path
          data-test="toggle-path"
          fill={mode === "dark" ? "#fff" : "#000"}
          d="M512 320C512 214 426 128 320 128L320 512C426 512 512 426 512 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z"
        />
      </svg>
    </>
  );
}
export default ToggleTheme;
