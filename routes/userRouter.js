const router = require('express').Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user.controllers')

router.get('/search', auth, userCtrl.searchUsers)
router.get('/user/:id', auth, userCtrl.getUser)
router.patch('/user', auth, userCtrl.updateUser)
router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unFollow)
router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)


module.exports = router;