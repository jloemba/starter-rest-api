const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health');

router.get('/',healthController.check);

module.exports = router;