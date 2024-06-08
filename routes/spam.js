// routes/spam.js
const express = require('express');
const router = express.Router();
const spamController = require('../controllers/spamController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/spam', authMiddleware, spamController.reportSpam);

module.exports = router;
