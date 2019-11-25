const express = require('express');
const router = express.Router();
const controller = require('../controllers/historyEventController');

router.get('/:settingsId', controller.getBySettings);
router.delete('/:eventId', controller.delete);
router.post('', controller.create);

module.exports = router;