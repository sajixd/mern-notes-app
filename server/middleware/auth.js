import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
      try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                  return res.status(401).json({ success: false, message: 'No authentication token, access denied' });
            }

            if (!process.env.JWT_SECRET) {
                  console.error("FATAL: JWT_SECRET is not defined in environment!");
                  return res.status(500).json({ success: false, message: 'Server configuration error' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);

            if (!user) {
                  return res.status(401).json({ success: false, message: 'User not found, token invalid' });
            }

            req.user = user;
            req.userId = user._id;
            next();
      } catch (error) {
            console.error('Auth middleware error:', error.message);
            if (error.name === 'JsonWebTokenError') {
                  return res.status(401).json({ success: false, message: 'Invalid token' });
            }
            if (error.name === 'TokenExpiredError') {
                  return res.status(401).json({ success: false, message: 'Token expired' });
            }
            res.status(401).json({ success: false, message: 'Authentication failed' });
      }
};

export default auth;
