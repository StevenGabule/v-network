const router = require('express').Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user.controllers')

router.get('/search', auth, userCtrl.searchUsers)
router.get('/user/:id', auth, userCtrl.getUser)

module.exports = router;