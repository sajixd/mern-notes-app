import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// NoteCard: Dribbble design style with theme support
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

function NoteCard({ note, index, onEdit, onDelete }) {
  const { theme } = useTheme();

  // Get a color from the palette based on index
  const bgColor = theme.colors.cardColors[index % theme.colors.cardColors.length];

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        y: -4,
        boxShadow: theme.shadows.cardHover,
        transition: { duration: 0.2 }
      }}
      onClick={() => onEdit(note)}
      style={{
        background: bgColor,
        borderRadius: theme.borderRadius.lg,
        padding: '20px',
        boxShadow: theme.shadows.card,
        cursor: 'pointer',
        position: 'relative',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title */}
      <h3 style={{
        margin: 0,
        fontSize: '1.125rem',
        fontWeight: 600,
        color: theme.colors.text,
        marginBottom: note.content ? '12px' : 0,
        wordBreak: 'break-word',
        lineHeight: 1.4,
      }}>
        {note.title}
      </h3>

      {/* Content */}
      {note.content && (
        <p style={{
          margin: 0,
          fontSize: '0.9375rem',
          color: theme.colors.textLight,
          lineHeight: 1.6,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          flex: 1,
        }}>
          {note.content}
        </p>
      )}

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: `1px solid rgba(0,0,0,0.08)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(note)}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: theme.borderRadius.sm,
            border: 'none',
            background: 'rgba(255,255,255,0.5)',
            color: theme.colors.text,
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            minHeight: '44px',
          }}
        >
          ✏️ Edit
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note._id);
          }}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: theme.borderRadius.sm,
            border: 'none',
            background: 'rgba(255,255,255,0.5)',
            color: theme.colors.danger,
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            minHeight: '44px',
          }}
        >
          🗑️ Delete
        </motion.button>
      </div>
    </motion.article>
  );
}

export default React.memo(NoteCard);
