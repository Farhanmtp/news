import React, { useEffect, useState } from 'react';
import Sun from '../icons/Sun';
import Moon from '../icons/Moon';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  
    const storedTheme = localStorage.getItem('theme') || systemTheme;
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);
  

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    setTheme(newTheme);
  };

  

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-lightgray300 dark:bg-darkgray500 text-white dark:text-black rounded-full transition-all hidden sm:block"
    >
       {theme === 'light' ? (<Moon/>) : (<Sun/>)}
    </button>
  );
};

export default ThemeToggle;
