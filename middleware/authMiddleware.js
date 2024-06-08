import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';

const { verbose } = sqlite3;
const db = new verbose().Database('./db/spam_detection.db');

export function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, 'jwtSecret');

    // Add user from payload
    req.user = decoded.user;

    // Check if user exists and is valid
    db.get('SELECT * FROM users WHERE id = ?', [req.user.id], (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      next();
    });

  } catch (err) {
    console.error('Token Error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
}
