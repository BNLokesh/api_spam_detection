// controllers/contactsController.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/spam_detection.db');

exports.getContacts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Retrieve user's contacts
    db.all('SELECT * FROM contacts WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      res.json(rows);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addContact = async (req, res) => {
  try {
    const { contactId, name } = req.body;
    const userId = req.user.id;

    // Insert contact into database
    db.run('INSERT INTO contacts (user_id, contact_id, name) VALUES (?, ?, ?)',
      [userId, contactId, name],
      (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json({ message: 'Contact added successfully' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
