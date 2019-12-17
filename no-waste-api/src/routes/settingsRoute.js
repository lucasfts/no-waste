const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsController');

router.get('/:userId', controller.getByUser);
router.post('', controller.create);
router.put('/:id', controller.update);

module.exports = router;