const router = require('express').Router();
const auth = require('../middleware/auth');
const notifyCtrl = require('../controllers/notify.controller');

router.post('/notify', auth, notifyCtrl.createNotify);
router.delete('/notify/:id', auth, notifyCtrl.removeNotify);
router.get('/notifies', auth, notifyCtrl.getNotifies);

module.exports = router;