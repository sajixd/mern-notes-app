import React from 'react';
import { AnimatePresence } from 'framer-motion';
import NoteCard from './NoteCard';
import { useTheme } from '../context/ThemeContext';

// NotesList: Responsive Grid Layout
function NotesList({ notes, onEdit, onDelete }) {
  const { theme } = useTheme();

  if (notes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        color: theme.colors.textMuted,
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '16px',
          opacity: 0.4,
        }}>
          📝
        </div>
        <p style={{
          fontSize: '1.25rem',
          fontWeight: 400,
          color: theme.colors.textLight,
        }}>
          Create your first note
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        width: '100%',
      }}
    >
      <AnimatePresence mode="popLayout">
        {notes.map((note, i) => (
          <NoteCard
            key={note._id}
            note={note}
            index={i}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>

      <style>{`
        @media (max-width: ${theme.breakpoints.mobile}px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (min-width: ${theme.breakpoints.mobile + 1}px) and (max-width: ${theme.breakpoints.tablet}px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default NotesList;
