import React, { createContext, useContext, useState, useEffect } from 'react';
import getTheme from '../theme';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
      const context = useContext(ThemeContext);
      if (!context) {
            throw new Error('useTheme must be used within ThemeProvider');
      }
      return context;
};

export const ThemeProvider = ({ children }) => {
      // Get initial theme from localStorage or default to light
      const [isDark, setIsDark] = useState(() => {
            const saved = localStorage.getItem('theme');
            return saved === 'dark';
      });

      const theme = getTheme(isDark);

      // Save to localStorage whenever theme changes
      useEffect(() => {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            // Update document background
            document.body.style.background = theme.colors.background;
            document.body.style.color = theme.colors.text;
      }, [isDark, theme.colors.background, theme.colors.text]);

      const toggleTheme = () => {
            setIsDark(!isDark);
      };

      return (
            <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
                  {children}
            </ThemeContext.Provider>
      );
};
