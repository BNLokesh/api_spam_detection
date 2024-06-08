const sqlite3 = require('sqlite3').verbose();

// SQLite Database Connection
const db = new sqlite3.Database('./db/spam_detection.db');

// Sample data
const users = [
  { name: 'John Doe', phone: '1234567890', email: 'john@example.com', password: 'password1' },
  { name: 'Jane Smith', phone: '9876543210', email: 'jane@example.com', password: 'password2' }
];

const contacts = [
  { user_id: 1, name: 'Alice', phone: '1111111111' },
  { user_id: 1, name: 'Bob', phone: '2222222222' },
  { user_id: 2, name: 'Charlie', phone: '3333333333' }
];

// Function to populate users table
function populateUsers() {
  const insertUser = 'INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)';
  users.forEach(user => {
    db.run(insertUser, [user.name, user.phone, user.email, user.password], err => {
      if (err) {
        console.error('Error inserting user:', err.message);
      } else {
        console.log(`Inserted user: ${user.name}`);
      }
    });
  });
}

// Function to populate contacts table
function populateContacts() {
  const insertContact = 'INSERT INTO contacts (user_id, name, phone) VALUES (?, ?, ?)';
  contacts.forEach(contact => {
    db.run(insertContact, [contact.user_id, contact.name, contact.phone], err => {
      if (err) {
        console.error('Error inserting contact:', err.message);
      } else {
        console.log(`Inserted contact: ${contact.name}`);
      }
    });
  });
}

// Populate the database
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS users');
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT UNIQUE, email TEXT, password TEXT)');
  db.run('DROP TABLE IF EXISTS contacts');
  db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT, phone TEXT, FOREIGN KEY(user_id) REFERENCES users(id))');

  populateUsers();
  populateContacts();
});

// Close database connection
db.close();
