const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getUser);
router.post('/', controller.createUser);
router.post('/', controller.login);
router.put('/:id', controller.updateUser);

module.exports = router;