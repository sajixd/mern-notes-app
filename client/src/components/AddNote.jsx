import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// AddNote: Form with theme support
function AddNote({ onSubmit, editingNote, onClose }) {
  const { theme } = useTheme();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (editingNote) {
      setForm({ title: editingNote.title, content: editingNote.content });
    } else {
      setForm({ title: '', content: '' });
    }
  }, [editingNote]);

  const submit = (e) => {
    e && e.preventDefault();
    if (!form.title.trim() && !form.content.trim()) {
      alert('Please add a title or content!');
      return;
    }
    if (!form.title.trim()) {
      setForm({ ...form, title: 'Untitled' });
    }
    onSubmit(form);
    setForm({ title: '', content: '' });
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <h2 style={{
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 600,
        color: theme.colors.text,
      }}>
        {editingNote ? 'Edit Note' : 'New Note'}
      </h2>

      {/* Title input */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: theme.colors.textLight,
          marginBottom: '8px',
        }}>
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter note title..."
          autoFocus
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: theme.borderRadius.md,
            border: `2px solid ${theme.colors.border}`,
            background: theme.colors.cardBg,
            color: theme.colors.text,
            fontSize: '1rem',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s',
            minHeight: '48px',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.colors.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.colors.border;
          }}
        />
      </div>

      {/* Content textarea */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: theme.colors.textLight,
          marginBottom: '8px',
        }}>
          Content
        </label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write your note..."
          rows={6}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: theme.borderRadius.md,
            border: `2px solid ${theme.colors.border}`,
            background: theme.colors.cardBg,
            color: theme.colors.text,
            fontSize: '1rem',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s',
            minHeight: '120px',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.colors.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.colors.border;
          }}
        />
      </div>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '8px',
      }}>
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1,
            padding: '14px 24px',
            borderRadius: theme.borderRadius.md,
            border: `2px solid ${theme.colors.border}`,
            background: 'transparent',
            color: theme.colors.text,
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            minHeight: '48px',
          }}
        >
          Cancel
        </motion.button>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1,
            padding: '14px 24px',
            borderRadius: theme.borderRadius.md,
            border: 'none',
            background: `linear-gradient(135deg, ${theme.colors.primary}, #8b5cf6)`,
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: theme.shadows.card,
            minHeight: '48px',
          }}
        >
          {editingNote ? 'Save' : 'Create'}
        </motion.button>
      </div>

      <style>{`
        @media (max-width: ${theme.breakpoints.mobile}px) {
          button {
            font-size: 0.9375rem !important;
          }
        }
      `}</style>
    </form>
  );
}

export default AddNote;
