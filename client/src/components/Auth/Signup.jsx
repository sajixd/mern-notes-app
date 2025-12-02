import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Signup({ onSwitch }) {
      const { signup, error } = useAuth();
      const { theme } = useTheme();
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [successMessage, setSuccessMessage] = useState('');

      const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const success = await signup(name, email, password);
            setIsLoading(false);
            if (success) {
                  setSuccessMessage('Account created successfully! Redirecting to login...');
                  setTimeout(() => {
                        onSwitch();
                  }, 2000);
            }
      };

      return (
            <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
            >
                  <h2 style={{
                        marginBottom: '24px',
                        textAlign: 'center',
                        color: theme.colors.text,
                        fontSize: '1.75rem'
                  }}>
                        Create Account
                  </h2>

                  {successMessage && (
                        <div style={{
                              padding: '12px',
                              background: 'rgba(72, 187, 120, 0.1)',
                              color: '#48bb78',
                              borderRadius: theme.borderRadius.md,
                              marginBottom: '16px',
                              fontSize: '0.875rem',
                              textAlign: 'center',
                              border: '1px solid rgba(72, 187, 120, 0.2)'
                        }}>
                              {successMessage}
                        </div>
                  )}

                  {error && (
                        <div style={{
                              padding: '12px',
                              background: 'rgba(245, 101, 101, 0.1)',
                              color: theme.colors.danger,
                              borderRadius: theme.borderRadius.md,
                              marginBottom: '16px',
                              fontSize: '0.875rem',
                              textAlign: 'center'
                        }}>
                              {error}
                        </div>
                  )}

                  <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                              <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: theme.colors.textLight,
                                    fontSize: '0.875rem'
                              }}>
                                    Full Name
                              </label>
                              <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={{
                                          width: '100%',
                                          padding: '12px',
                                          borderRadius: theme.borderRadius.md,
                                          border: `1px solid ${theme.colors.border}`,
                                          background: theme.colors.background,
                                          color: theme.colors.text,
                                          fontSize: '1rem',
                                          outline: 'none'
                                    }}
                              />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                              <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: theme.colors.textLight,
                                    fontSize: '0.875rem'
                              }}>
                                    Email
                              </label>
                              <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                          width: '100%',
                                          padding: '12px',
                                          borderRadius: theme.borderRadius.md,
                                          border: `1px solid ${theme.colors.border}`,
                                          background: theme.colors.background,
                                          color: theme.colors.text,
                                          fontSize: '1rem',
                                          outline: 'none'
                                    }}
                              />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                              <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: theme.colors.textLight,
                                    fontSize: '0.875rem'
                              }}>
                                    Password
                              </label>
                              <div style={{ position: 'relative' }}>
                                    <input
                                          type={showPassword ? "text" : "password"}
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          required
                                          minLength={6}
                                          style={{
                                                width: '100%',
                                                padding: '12px',
                                                paddingRight: '40px',
                                                borderRadius: theme.borderRadius.md,
                                                border: `1px solid ${theme.colors.border}`,
                                                background: theme.colors.background,
                                                color: theme.colors.text,
                                                fontSize: '1rem',
                                                outline: 'none'
                                          }}
                                    />
                                    <button
                                          type="button"
                                          onClick={() => setShowPassword(!showPassword)}
                                          style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                color: theme.colors.textLight
                                          }}
                                    >
                                          {showPassword ? '👁️' : '🙈'}
                                    </button>
                              </div>
                        </div>

                        <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="submit"
                              disabled={isLoading}
                              style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: theme.borderRadius.md,
                                    border: 'none',
                                    background: `linear-gradient(135deg, ${theme.colors.primary}, #8b5cf6)`,
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    opacity: isLoading ? 0.7 : 1
                              }}
                        >
                              {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </motion.button>
                  </form>

                  <p style={{
                        marginTop: '24px',
                        textAlign: 'center',
                        color: theme.colors.textLight,
                        fontSize: '0.9rem'
                  }}>
                        Already have an account?{' '}
                        <button
                              onClick={onSwitch}
                              style={{
                                    background: 'none',
                                    border: 'none',
                                    color: theme.colors.primary,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: 'inherit'
                              }}
                        >
                              Login
                        </button>
                  </p>
            </motion.div>
      );
}
