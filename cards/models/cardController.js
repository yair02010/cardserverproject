const { validateCard } = require('../validation/joi/cardvaldation');
const Card = require('../models/mongoDB/Card');

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCard = async (req, res) => {
    try {
        if (!req.user || (!req.user.isBusiness && !req.user.isAdmin)) {
            return res.status(403).json({ message: "Access denied. Only Business or Admin users can create cards." });
        }

        const validationMessage = validateCard(req.body);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const newCard = new Card({ ...req.body, userId: req.user.id });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCard = async (req, res) => {
    try {
        const validationMessage = validateCard(req.body);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        if (req.user.id !== card.userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Only the creator or Admin can update this card." });
        }

        const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        if (req.user.id !== card.userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Only the creator or Admin can delete this card." });
        }

        await Card.findByIdAndDelete(req.params.id);
        res.json({ message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addLike = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        if (card.likes.includes(req.user.id)) {
            return res.status(400).json({ message: "You already liked this card" });
        }

        card.likes.push(req.user.id);
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    addLike
};
