const express = require('express');
const router = express.Router();
const partController = require('../controllers/part');
const verifyToken = require('../services/utils/verifyToken');

router.get('/',verifyToken, partController.getAll);
router.get('/single',verifyToken, partController.getOne);
router.post('/create',verifyToken, partController.create);
router.put('/update',verifyToken, partController.update);
router.delete('/delete',verifyToken, partController.delete);


module.exports = router;