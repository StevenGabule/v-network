const router = require('express').Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user.controllers')

router.get('/search', auth, userCtrl.searchUsers)

module.exports = router;