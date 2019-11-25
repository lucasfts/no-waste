const express = require('express');
const router = express.Router();
const controller = require('../controllers/foodController');

router.get('/:settingsId', controller.getBySettings);
router.delete('/:foodId', controller.delete);
router.post('', controller.create);

module.exports = router;