import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// FAB: Floating Action Button
export default function FAB({ onClick, isOpen }) {
  const { theme } = useTheme();

  return (
    <motion.button
      aria-label="Add note"
      initial={false}
      animate={isOpen ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
      whileHover={{ scale: isOpen ? 1.1 : 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={theme.timing.spring}
      onClick={onClick}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: 100,
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.colors.primary}, #8b5cf6)`,
        color: '#ffffff',
        boxShadow: theme.shadows.fab,
        fontSize: '2rem',
        fontWeight: 300,
      }}
    >
      +
    </motion.button>
  );
}
