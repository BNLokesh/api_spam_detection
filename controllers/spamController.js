// controllers/spamController.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/spam_detection.db');

exports.reportSpam = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const userId = req.user.id;

    // Insert spam report into database
    db.run('INSERT INTO spam_reports (user_id, phone_number) VALUES (?, ?)',
      [userId, phone_number],
      (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json({ message: 'Spam reported successfully' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
