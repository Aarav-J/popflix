import React from 'react';
import { Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} weight="bold" className="text-gray-100" />
      ) : (
        <Moon size={20} weight="bold" className="text-gray-600" />
      )}
    </button>
  );
}