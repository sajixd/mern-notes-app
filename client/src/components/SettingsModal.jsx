import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsModal({ isOpen, onClose }) {
      const { theme } = useTheme();
      const { user, updateProfile, changePassword, deleteAccount } = useAuth();
      const [activeTab, setActiveTab] = useState('about'); // 'about' or 'settings'

      // Profile Form State
      const [name, setName] = useState(user?.name || '');
      const [email, setEmail] = useState(user?.email || '');
      const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

      // Password Form State
      const [currentPassword, setCurrentPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

      // Delete Account State
      const [deletePassword, setDeletePassword] = useState('');
      const [isDeleting, setIsDeleting] = useState(false);
      const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

      if (!isOpen) return null;

      const handleUpdateProfile = async (e) => {
            e.preventDefault();
            setProfileMessage({ type: '', text: '' });
            const res = await updateProfile({ name, email });
            setProfileMessage({
                  type: res.success ? 'success' : 'error',
                  text: res.message
            });
      };

      const handleChangePassword = async (e) => {
            e.preventDefault();
            setPasswordMessage({ type: '', text: '' });
            const res = await changePassword({ currentPassword, newPassword });
            setPasswordMessage({
                  type: res.success ? 'success' : 'error',
                  text: res.message
            });
            if (res.success) {
                  setCurrentPassword('');
                  setNewPassword('');
            }
      };

      const handleDeleteAccount = async () => {
            setIsDeleting(true);
            const res = await deleteAccount(deletePassword);
            setIsDeleting(false);
            if (!res.success) {
                  alert(res.message); // Simple alert for critical failure in modal
            }
      };

      const TabButton = ({ id, label }) => (
            <button
                  onClick={() => setActiveTab(id)}
                  style={{
                        flex: 1,
                        padding: '12px',
                        background: activeTab === id ? theme.colors.cardBg : 'transparent',
                        border: 'none',
                        borderBottom: `2px solid ${activeTab === id ? theme.colors.primary : 'transparent'}`,
                        color: activeTab === id ? theme.colors.primary : theme.colors.textLight,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                  }}
            >
                  {label}
            </button>
      );

      return (
            <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px'
            }} onClick={onClose}>
                  <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                              background: theme.colors.background,
                              width: '100%',
                              maxWidth: '500px',
                              borderRadius: theme.borderRadius.lg,
                              boxShadow: theme.shadows.modal,
                              overflow: 'hidden',
                              maxHeight: '90vh',
                              display: 'flex',
                              flexDirection: 'column'
                        }}
                  >
                        {/* Header */}
                        <div style={{
                              display: 'flex',
                              borderBottom: `1px solid ${theme.colors.border}`,
                        }}>
                              <TabButton id="about" label="About" />
                              <TabButton id="settings" label="Account Settings" />
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px', overflowY: 'auto' }}>
                              {activeTab === 'about' ? (
                                    <div style={{ textAlign: 'center', color: theme.colors.text }}>
                                          <h2 style={{ marginBottom: '16px' }}>📝 MERN Notes App</h2>
                                          <p style={{ color: theme.colors.textLight, marginBottom: '24px' }}>
                                                A simple, secure, and beautiful way to keep your thoughts organized.
                                          </p>
                                          <div style={{
                                                padding: '16px',
                                                background: theme.colors.cardBg,
                                                borderRadius: theme.borderRadius.md,
                                                fontSize: '0.9rem'
                                          }}>
                                                <p>Version 1.0.0</p>
                                                <p>Created by Sajid</p>
                                          </div>
                                    </div>
                              ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                                          {/* Profile Section */}
                                          <section>
                                                <h3 style={{ color: theme.colors.text, marginBottom: '16px' }}>Profile</h3>
                                                <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                      <input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            value={name}
                                                            onChange={e => setName(e.target.value)}
                                                            style={{
                                                                  padding: '10px',
                                                                  borderRadius: theme.borderRadius.md,
                                                                  border: `1px solid ${theme.colors.border}`,
                                                                  background: theme.colors.cardBg,
                                                                  color: theme.colors.text
                                                            }}
                                                      />
                                                      <input
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                            style={{
                                                                  padding: '10px',
                                                                  borderRadius: theme.borderRadius.md,
                                                                  border: `1px solid ${theme.colors.border}`,
                                                                  background: theme.colors.cardBg,
                                                                  color: theme.colors.text
                                                            }}
                                                      />
                                                      <button
                                                            type="submit"
                                                            style={{
                                                                  padding: '10px',
                                                                  background: theme.colors.primary,
                                                                  color: '#fff',
                                                                  border: 'none',
                                                                  borderRadius: theme.borderRadius.md,
                                                                  cursor: 'pointer',
                                                                  fontWeight: 600
                                                            }}
                                                      >
                                                            Update Profile
                                                      </button>
                                                      {profileMessage.text && (
                                                            <p style={{
                                                                  color: profileMessage.type === 'success' ? '#48bb78' : theme.colors.danger,
                                                                  fontSize: '0.9rem',
                                                                  textAlign: 'center'
                                                            }}>
                                                                  {profileMessage.text}
                                                            </p>
                                                      )}
                                                </form>
                                          </section>

                                          <hr style={{ border: 'none', borderTop: `1px solid ${theme.colors.border}` }} />

                                          {/* Password Section */}
                                          <section>
                                                <h3 style={{ color: theme.colors.text, marginBottom: '16px' }}>Change Password</h3>
                                                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                      <input
                                                            type="password"
                                                            placeholder="Current Password"
                                                            value={currentPassword}
                                                            onChange={e => setCurrentPassword(e.target.value)}
                                                            style={{
                                                                  padding: '10px',
                                                                  borderRadius: theme.borderRadius.md,
                                                                  border: `1px solid ${theme.colors.border}`,
                                                                  background: theme.colors.cardBg,
                                                                  color: theme.colors.text
                                                            }}
                                                      />
                                                      <input
                                                            type="password"
                                                            placeholder="New Password"
                                                            value={newPassword}
                                                            onChange={e => setNewPassword(e.target.value)}
                                                            style={{
                                                                  padding: '10px',
                                                                  borderRadius: theme.borderRadius.md,
                                                                  border: `1px solid ${theme.colors.border}`,
                                                                  background: theme.colors.cardBg,
                                                                  color: theme.colors.text
                                                            }}
                                                      />
                                                      <button
                                                            type="submit"
                                                            style={{
                                                                  padding: '10px',
                                                                  background: theme.colors.cardBg,
                                                                  color: theme.colors.text,
                                                                  border: `1px solid ${theme.colors.border}`,
                                                                  borderRadius: theme.borderRadius.md,
                                                                  cursor: 'pointer',
                                                                  fontWeight: 600
                                                            }}
                                                      >
                                                            Change Password
                                                      </button>
                                                      {passwordMessage.text && (
                                                            <p style={{
                                                                  color: passwordMessage.type === 'success' ? '#48bb78' : theme.colors.danger,
                                                                  fontSize: '0.9rem',
                                                                  textAlign: 'center'
                                                            }}>
                                                                  {passwordMessage.text}
                                                            </p>
                                                      )}
                                                </form>
                                          </section>

                                          <hr style={{ border: 'none', borderTop: `1px solid ${theme.colors.border}` }} />

                                          {/* Danger Zone */}
                                          <section>
                                                <h3 style={{ color: theme.colors.danger, marginBottom: '16px' }}>Danger Zone</h3>
                                                {!showDeleteConfirm ? (
                                                      <button
                                                            onClick={() => setShowDeleteConfirm(true)}
                                                            style={{
                                                                  width: '100%',
                                                                  padding: '12px',
                                                                  background: 'rgba(245, 101, 101, 0.1)',
                                                                  color: theme.colors.danger,
                                                                  border: `1px solid ${theme.colors.danger}`,
                                                                  borderRadius: theme.borderRadius.md,
                                                                  cursor: 'pointer',
                                                                  fontWeight: 600
                                                            }}
                                                      >
                                                            Delete Account
                                                      </button>
                                                ) : (
                                                      <div style={{
                                                            padding: '16px',
                                                            background: 'rgba(245, 101, 101, 0.05)',
                                                            borderRadius: theme.borderRadius.md,
                                                            border: `1px solid ${theme.colors.danger}`
                                                      }}>
                                                            <p style={{ color: theme.colors.text, marginBottom: '12px', fontSize: '0.9rem' }}>
                                                                  To confirm deletion, please enter your password. This action cannot be undone.
                                                            </p>
                                                            <input
                                                                  type="password"
                                                                  placeholder="Enter your password"
                                                                  value={deletePassword}
                                                                  onChange={e => setDeletePassword(e.target.value)}
                                                                  style={{
                                                                        width: '100%',
                                                                        padding: '10px',
                                                                        borderRadius: theme.borderRadius.md,
                                                                        border: `1px solid ${theme.colors.border}`,
                                                                        background: theme.colors.background,
                                                                        color: theme.colors.text,
                                                                        marginBottom: '12px'
                                                                  }}
                                                            />
                                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                                  <button
                                                                        onClick={() => setShowDeleteConfirm(false)}
                                                                        style={{
                                                                              flex: 1,
                                                                              padding: '10px',
                                                                              background: 'transparent',
                                                                              color: theme.colors.text,
                                                                              border: `1px solid ${theme.colors.border}`,
                                                                              borderRadius: theme.borderRadius.md,
                                                                              cursor: 'pointer'
                                                                        }}
                                                                  >
                                                                        Cancel
                                                                  </button>
                                                                  <button
                                                                        onClick={handleDeleteAccount}
                                                                        disabled={!deletePassword || isDeleting}
                                                                        style={{
                                                                              flex: 1,
                                                                              padding: '10px',
                                                                              background: theme.colors.danger,
                                                                              color: '#fff',
                                                                              border: 'none',
                                                                              borderRadius: theme.borderRadius.md,
                                                                              cursor: 'pointer',
                                                                              fontWeight: 600,
                                                                              opacity: (!deletePassword || isDeleting) ? 0.5 : 1
                                                                        }}
                                                                  >
                                                                        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                                                  </button>
                                                            </div>
                                                      </div>
                                                )}
                                          </section>

                                    </div>
                              )}
                        </div>

                        {/* Footer Close Button */}
                        <div style={{
                              padding: '16px',
                              borderTop: `1px solid ${theme.colors.border}`,
                              display: 'flex',
                              justifyContent: 'flex-end'
                        }}>
                              <button
                                    onClick={onClose}
                                    style={{
                                          padding: '8px 24px',
                                          background: theme.colors.cardBg,
                                          color: theme.colors.text,
                                          border: `1px solid ${theme.colors.border}`,
                                          borderRadius: theme.borderRadius.md,
                                          cursor: 'pointer'
                                    }}
                              >
                                    Close
                              </button>
                        </div>
                  </motion.div>
            </div>
      );
}
