                const Card = require('../models/card');
                const logger = require('../../utils/logger');
                exports.getAllCards = async (req, res) => {
                    try {
                        const cards = await Card.find();
                        res.json(cards);
                    } catch (error) {
                        res.status(500).json({ message: error.message });
                    }   
                };


                exports.getCardById = async (req, res) => {
                    try {
                        const card = await Card.findById(req.params.id);
                        if (!card) return res.status(404).json({ message: "Card not found" });
                        res.json(card);
                    } catch (error) {
                        res.status(500).json({ message: error.message });
                    }
                };

                exports.createCard = async (req, res) => {
            try {
                if (!req.user || (!req.user.isBusiness && !req.user.isAdmin)) {
                    return res.status(403).json({ message: "Access denied. Only Business or Admin users can create cards." });
                }

                const newCard = new Card({
                    ...req.body,              
                    userId: req.user.id 
                });
                logger.info(`User ${req.user.id} created a new card with ID ${newCard._id}`);
                await newCard.save(); 
                res.status(201).json(newCard); 
            } catch (error) {
                res.status(500).json({ message: error.message });
                logger.error(`Error creating card: ${error.message}`);
            }
        };


            exports.updateCard = async (req, res) => {
                try {
                    const card = await Card.findById(req.params.id);
                    if (!card) return res.status(404).json({ message: "Card not found" });

                    if (req.user.id !== card.userId.toString() && !req.user.isAdmin) {
                        return res.status(403).json({ message: "Access denied. Only the creator or Admin can update this card." });
                    }

                    console.log("User updating card:", req.user);
                    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
                    res.json(updatedCard);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };


            exports.deleteCard = async (req, res) => {
                try {
                    const card = await Card.findById(req.params.id);
                    if (!card) return res.status(404).json({ message: "Card not found" });

                    if (req.user.id !== card.userId.toString() && !req.user.isAdmin) {
                        return res.status(403).json({ message: "Access denied. Only the creator or Admin can delete this card." });
                    }

                    console.log("User deleting card:", req.user);
                    const deletedCard = await Card.findByIdAndDelete(req.params.id);
                    res.json({ message: "Card deleted successfully" });
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };
        exports.addLike = async (req, res) => {
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
        exports.addLike = async (req, res) => {
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
