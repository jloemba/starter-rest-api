const express = require('express');
const router = express.Router();
const lyricsController = require('../controllers/lyrics');
const verifyToken = require('../utils/verifyToken');

router.get('/',verifyToken,lyricsController.getAll);
router.get('/single',verifyToken, lyricsController.getOne);
router.post('/create',verifyToken, lyricsController.create);
router.put('/update',verifyToken, lyricsController.update);
router.delete('/delete',verifyToken, lyricsController.delete);
router.delete('/delete/song',verifyToken, lyricsController.deleteBySong);
router.get('/song',verifyToken,lyricsController.bySong )


module.exports = router;