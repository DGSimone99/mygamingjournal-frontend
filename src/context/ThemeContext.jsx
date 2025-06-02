import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const body = document.body;

    body.className = theme + "-theme";

    if (!isFirstLoad) {
      body.classList.add("theme-transition");
      setTimeout(() => {
        body.classList.remove("theme-transition");
      }, 1000);
    }

    localStorage.setItem("theme", theme);
    setIsFirstLoad(false);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
