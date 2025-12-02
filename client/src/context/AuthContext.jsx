import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from '../api';

const AuthContext = createContext();

export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) {
            throw new Error('useAuth must be used within AuthProvider');
      }
      return context;
};

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      // Check for token on mount
      useEffect(() => {
            const checkAuth = async () => {
                  try {
                        // Try to get token from localStorage
                        const token = localStorage.getItem('token');
                        if (token) {
                              try {
                                    const decoded = jwtDecode(token);
                                    // Check expiration
                                    if (decoded.exp * 1000 < Date.now()) {
                                          console.log('Token expired, logging out');
                                          logout();
                                    } else {
                                          // Fetch user to ensure token is still valid
                                          await fetchUser();
                                    }
                              } catch (err) {
                                    console.error('Token decode error:', err);
                                    logout();
                              }
                        } else {
                              setLoading(false);
                        }
                  } catch (storageErr) {
                        // Handle browsers with localStorage disabled/blocked
                        console.error('localStorage access error:', storageErr);
                        setError('Browser storage is disabled. Please enable cookies and site data.');
                        setLoading(false);
                  }
            };

            checkAuth();
      }, []);

      const fetchUser = async () => {
            try {
                  const res = await axios.get('/api/auth/me');
                  setUser(res.data.user);
            } catch (err) {
                  console.error('Error fetching user:', err);
                  logout();
            } finally {
                  setLoading(false);
            }
      };

      const login = async (email, password) => {
            setError(null);
            try {
                  const res = await axios.post('/api/auth/login', { email, password });
                  const { token, user } = res.data;

                  // Try to save token to localStorage with error handling
                  try {
                        localStorage.setItem('token', token);
                  } catch (storageErr) {
                        console.error('Failed to save token:', storageErr);
                        setError('Unable to save login session. Please check browser settings.');
                        return false;
                  }

                  setUser(user);
                  return true;
            } catch (err) {
                  console.error('Login error:', err);
                  setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
                  return false;
            }
      };

      const signup = async (name, email, password) => {
            setError(null);
            try {
                  await axios.post('/api/auth/signup', { name, email, password });
                  // Don't auto login, just return true
                  return true;
            } catch (err) {
                  setError(err.response?.data?.message || 'Signup failed. Please try again.');
                  return false;
            }
      };

      const logout = () => {
            try {
                  localStorage.removeItem('token');
            } catch (storageErr) {
                  console.error('Failed to remove token:', storageErr);
                  // Continue with logout even if storage fails
            }
            setUser(null);
            setError(null);
      };

      const deleteAccount = async () => {
            try {
                  await axios.delete('/api/auth/me');
                  logout();
                  return true;
            } catch (err) {
                  console.error('Delete account error:', err);
                  setError(err.response?.data?.message || 'Failed to delete account');
                  return false;
            }
      };

      return (
            <AuthContext.Provider value={{ user, loading, error, login, signup, logout, deleteAccount }}>
                  {children}
            </AuthContext.Provider>
      );
};
