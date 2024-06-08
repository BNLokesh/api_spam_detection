// routes/contacts.js
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const authMiddleware = require('../utils/authMiddleware');

router.get('/contacts', authMiddleware, contactsController.getContacts);
router.post('/contacts', authMiddleware, contactsController.addContact);

module.exports = router;
