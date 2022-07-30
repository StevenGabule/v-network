const router = require('express').Router();
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth')

router.post('/comment', auth, commentCtrl.createComment)

module.exports = router;