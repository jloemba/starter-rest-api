const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.register);
router.get('/is-user-exist', userController.isUserExistByEmail);
module.exports = router;