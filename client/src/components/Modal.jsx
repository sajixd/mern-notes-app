import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Modal: Responsive modal
export default function Modal({ isOpen, onClose, children }) {
  const { theme } = useTheme();

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div aria-modal role="dialog">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 200,
              cursor: 'pointer',
            }}
          />

          {/* Modal body */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={theme.timing.spring}
            style={{
              position: 'fixed',
              left: '50%',
              bottom: '20px',
              transform: 'translateX(-50%)',
              zIndex: 201,
              width: 'min(500px, calc(100vw - 32px))',
              maxHeight: '70vh',
              overflowY: 'auto',
              padding: '20px',
              borderRadius: theme.borderRadius.lg,
              background: theme.colors.cardBg,
              boxShadow: theme.shadows.modal,
              cursor: 'default',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>

          <style>{`
            @media (max-width: ${theme.breakpoints.mobile}px) {
              div[style*="position: fixed"][style*="z-index: 201"] {
                width: 100% !important;
                height: 100% !important;
                max-width: none !important;
                max-height: none !important;
                border-radius: 0 !important;
                top: 0 !important;
                left: 0 !important;
                transform: none !important;
                padding: 20px !important;
                margin: 0 !important;
                bottom: 0 !important;
                display: flex;
                flex-direction: column;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
