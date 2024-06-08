// controllers/authController.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/spam_detection.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, phone_number, email, password } = req.body;

    // Check if user already exists
    db.get('SELECT * FROM users WHERE phone_number = ?', [phone_number], async (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      if (row) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password before saving in database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert user into database
      db.run('INSERT INTO users (name, phone_number, email, password) VALUES (?, ?, ?, ?)',
        [name, phone_number, email, hashedPassword],
        (err) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          res.json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    // Check if user exists
    db.get('SELECT * FROM users WHERE phone_number = ?', [phone_number], async (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }

      // Return JWT token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
