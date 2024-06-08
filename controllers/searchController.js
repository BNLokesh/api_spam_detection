const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, '../db/spam_detection.db');

// Open the SQLite database
const db = new sqlite3.Database(dbPath);

// Search by name function
exports.searchByName = (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  // Prepare the SQL query
  const query = `
    SELECT name, phone, email
    FROM users
    WHERE name LIKE ?
    ORDER BY
      CASE
        WHEN name LIKE ? THEN 1
        ELSE 2
      END
  `;
  const params = [`${name}%`, `%${name}%`];

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Search by phone function
exports.searchByPhone = (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: 'Phone query parameter is required' });
  }

  // Prepare the SQL query
  const query = `
    SELECT name, phone, email
    FROM users
    WHERE phone = ?
  `;
  const params = [phone];

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
