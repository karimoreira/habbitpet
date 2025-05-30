const express = require('express');
const router = express.Router();
const { updateXP } = require('../controllers/xpController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/update', authMiddleware, updateXP);

module.exports = router;
