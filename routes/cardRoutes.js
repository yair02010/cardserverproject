const express = require('express');
const cardController = require('../controllers/cardController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.post('/', authenticate, cardController.createCard);
router.put('/:id', authenticate, cardController.updateCard); // הוספת אימות
router.delete('/:id', authenticate, cardController.deleteCard); // הוספת אימות

module.exports = router;
