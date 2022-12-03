const express = require('express');
const router = express.Router();
const songController = require('../controllers/song');
const verifyToken = require('../utils/verifyToken');

router.get('/',verifyToken, songController.getAll);
router.get('/single',verifyToken, songController.getOne);
router.post('/create',verifyToken, songController.create);
router.put('/update',verifyToken, songController.update);
router.delete('/delete',verifyToken, songController.delete);

module.exports = router;