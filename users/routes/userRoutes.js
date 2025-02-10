const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../../auth/providers/auth');

const router = express.Router();

router.post('/login', userController.login);
router.post('/', userController.createUser);
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.patch('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
