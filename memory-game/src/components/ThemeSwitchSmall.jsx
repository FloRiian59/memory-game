import { useEffect, useState } from "react";

export default function ThemeSwitchSmall({ theme, setTheme }) {
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark, setTheme]);

  return (
    <button
      className={`theme-switch-small ${isDark ? "dark" : "light"}`}
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Changer le thème"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
