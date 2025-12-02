import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
      if (!process.env.JWT_SECRET) {
            console.error("FATAL: JWT_SECRET is not defined!");
            throw new Error("JWT_SECRET missing");
      }
      return jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
      );
};

// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
      try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                  return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({ success: false, message: 'User with this email already exists' });
            }

            const user = await User.create({ name, email, password });
            const token = generateToken(user._id);

            res.status(201).json({
                  success: true,
                  message: 'User registered successfully',
                  token,
                  user: { id: user._id, name: user.name, email: user.email },
            });
      } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ success: false, message: error.message || 'Server error during signup' });
      }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
      try {
            const { email, password } = req.body;

            if (!email || !password) {
                  return res.status(400).json({ success: false, message: 'Please provide email and password' });
            }

            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                  return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                  return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const token = generateToken(user._id);

            res.json({
                  success: true,
                  message: 'Login successful',
                  token,
                  user: { id: user._id, name: user.name, email: user.email },
            });
      } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: error.message || 'Server error during login' });
      }
});

// @route   GET /api/auth/me
router.get('/me', auth, async (req, res) => {
      try {
            const user = await User.findById(req.userId);
            if (!user) {
                  return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.json({
                  success: true,
                  user: { id: user._id, name: user.name, email: user.email },
            });
      } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
      }
});

// @route   DELETE /api/auth/me
router.delete('/me', auth, async (req, res) => {
      try {
            // Delete user's notes first (optional but good practice)
            // Assuming you have a Note model, you'd import it and delete notes here.
            // For now, we'll just delete the user.

            const user = await User.findByIdAndDelete(req.userId);
            if (!user) {
                  return res.status(404).json({ success: false, message: 'User not found' });
            }

            res.json({ success: true, message: 'Account deleted successfully' });
      } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
      }
});

export default router;
