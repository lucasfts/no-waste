const express = require('express');
const router = express.Router();
const controller = require('../controllers/historyController');

router.get('/:settingsId', controller.getBySettings);
router.delete('/:historyId', controller.delete);
router.put('/:historyId', controller.update);
router.post('', controller.create);

module.exports = router;