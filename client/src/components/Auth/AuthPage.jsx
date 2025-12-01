import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Signup from './Signup';
import { useTheme } from '../../context/ThemeContext';
import ParticleBackground from '../ParticleBackground';

export default function AuthPage() {
      const [isLogin, setIsLogin] = useState(true);
      const { theme, isDark, toggleTheme } = useTheme();

      return (
            <div style={{
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: '20px'
            }}>
                  <ParticleBackground isDark={isDark} />

                  {/* Theme Toggle */}
                  <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
                        <button
                              onClick={toggleTheme}
                              style={{
                                    padding: '10px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: theme.colors.cardBg,
                                    boxShadow: theme.shadows.card,
                                    cursor: 'pointer',
                                    fontSize: '1.5rem'
                              }}
                        >
                              {isDark ? '☀️' : '🌙'}
                        </button>
                  </div>

                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                              width: '100%',
                              maxWidth: '400px',
                              background: theme.colors.cardBg,
                              padding: '40px',
                              borderRadius: theme.borderRadius.xl,
                              boxShadow: theme.shadows.modal,
                              position: 'relative',
                              zIndex: 1
                        }}
                  >
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                              <span style={{ fontSize: '3rem' }}>📝</span>
                              <h1 style={{
                                    marginTop: '16px',
                                    color: theme.colors.text,
                                    fontSize: '2rem',
                                    fontWeight: 700
                              }}>
                                    My Notes
                              </h1>
                        </div>

                        <AnimatePresence mode="wait">
                              {isLogin ? (
                                    <Login key="login" onSwitch={() => setIsLogin(false)} />
                              ) : (
                                    <Signup key="signup" onSwitch={() => setIsLogin(true)} />
                              )}
                        </AnimatePresence>
                  </motion.div>
            </div>
      );
}
