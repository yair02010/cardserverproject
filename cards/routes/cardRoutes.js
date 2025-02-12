const express = require('express');
const cardController = require('../models/cardController');
const authenticate = require('../../auth/authenticateToken');

const router = express.Router();
console.log("cardController:", cardController);

router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.post('/', authenticate, cardController.createCard);
router.put('/:id', authenticate, cardController.updateCard); 
router.delete('/:id', authenticate, cardController.deleteCard);
router.patch('/:id/like', authenticate, cardController.addLike);

module.exports = router;
