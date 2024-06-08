const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');  // Make sure this path is correct

router.get('/name', searchController.searchByName);
router.get('/phone', searchController.searchByPhone);

module.exports = router;
