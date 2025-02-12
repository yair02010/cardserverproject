const express = require('express');
const userController = require('../models/userController'); 
const authenticate = require('../../auth/authenticateToken');

const router = express.Router();

router.get('/',authenticate, userController.getAllUsers);
router.get('/:id',authenticate, userController.getUserById);
router.post('/', userController.createUser);
router.post('/login', userController.login);   
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
