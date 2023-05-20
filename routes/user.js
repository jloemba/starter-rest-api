const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.register);
router.get('/is-user-exist', userController.isUserExistByEmail);
router.post('/enable-disable-account', userController.enableOrDisableUserAccount);
router.get('/all', userController.allUser);
router.get('/deactived', userController.deactivedAccount);

module.exports = router;