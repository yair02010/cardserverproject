const express = require('express');
const cardController = require('../controllers/cardController');
const authenticate = require('../../auth/providers/auth');
const router = express.Router();

router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.post('/', authenticate, cardController.createCard);
router.put('/:id', authenticate, cardController.updateCard); 
router.delete('/:id', authenticate, cardController.deleteCard); 

module.exports = router;
