const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/:id', controller.getUser);
router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.put('/:id', controller.updateUser);

module.exports = router;