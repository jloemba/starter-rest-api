const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health');
const verifyToken = require('../utils/verifyToken');

router.get('/',healthController.check);

module.exports = router;