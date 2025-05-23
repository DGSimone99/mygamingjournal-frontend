import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const body = document.body;

    body.classList.add("theme-transition");
    body.className = theme + "-theme theme-transition";

    localStorage.setItem("theme", theme);

    const timeout = setTimeout(() => {
      body.classList.remove("theme-transition");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
