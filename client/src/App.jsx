import React, { useState, useEffect } from 'react';
import axios from './api';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import ParticleBackground from './components/ParticleBackground';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import FAB from './components/FAB';
import Modal from './components/Modal';
import AuthPage from './components/Auth/AuthPage';
import SettingsModal from './components/SettingsModal';
import { motion } from 'framer-motion';

// App: Dribbble design with dark/light mode and Auth
export default function App() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, loading, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  // Load notes from API
  const loadNotes = async () => {
    try {
      const res = await axios.get('/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadNotes();
    } else {
      setNotes([]);
    }
  }, [user]);

  const handleSubmit = async (form) => {
    try {
      if (editingNote) {
        await axios.put(`/notes/${editingNote._id}`, form);
        setEditingNote(null);
      } else {
        await axios.post('/notes', form);
      }
      setModalOpen(false);
      loadNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.background,
        color: theme.colors.text
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Particle Background */}
      <ParticleBackground isDark={isDark} />

      {/* Header with theme toggle and logout */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: theme.colors.background,
        padding: '20px 16px',
        borderBottom: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{
          maxWidth: theme.maxWidth,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: theme.colors.text,
              letterSpacing: '-0.5px',
              margin: 0
            }}>
              📝 My Notes
            </h1>
            <span style={{
              fontSize: '0.9rem',
              color: theme.colors.textLight,
              background: theme.colors.cardBg,
              padding: '4px 8px',
              borderRadius: '12px',
              border: `1px solid ${theme.colors.border}`
            }}>
              {user.name}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              style={{
                padding: '10px 16px',
                borderRadius: theme.borderRadius.md,
                border: `2px solid ${theme.colors.border}`,
                background: theme.colors.cardBg,
                color: theme.colors.text,
                fontSize: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'inherit',
                boxShadow: theme.shadows.card,
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettingsOpen(true)}
              style={{
                padding: '10px 16px',
                borderRadius: theme.borderRadius.md,
                border: `2px solid ${theme.colors.border}`,
                background: theme.colors.cardBg,
                color: theme.colors.text,
                fontSize: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'inherit',
                boxShadow: theme.shadows.card,
              }}
              aria-label="Settings"
            >
              ⚙️
            </motion.button>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              style={{
                padding: '10px 16px',
                borderRadius: theme.borderRadius.md,
                border: `2px solid ${theme.colors.border}`,
                background: theme.colors.cardBg,
                color: theme.colors.danger,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: theme.shadows.card,
              }}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        maxWidth: theme.maxWidth,
        margin: '32px auto',
        padding: '0 16px 100px',
        position: 'relative',
        zIndex: 1,
      }}>
        <NotesList
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* FAB - Floating Action Button */}
      <FAB
        onClick={() => {
          setEditingNote(null);
          setModalOpen(true);
        }}
        isOpen={isModalOpen}
      />

      {/* Modal for Add/Edit */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddNote
          onSubmit={handleSubmit}
          editingNote={editingNote}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
