'use client'

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = storedTheme || systemTheme;

    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === null) return;

    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button 
      onClick={() => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
    >
      {theme === 'dark' ? <Sun className="w-5.5 h-5.5 group-hover:-rotate-90 transition-transform" /> : <Moon className="w-5.5 h-5.5 group-hover:-rotate-90 transition-transform" />}
    </button>
  )
}

export default ThemeToggle;
