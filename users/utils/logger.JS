exports.createCard = async (req, res) => {
    try {
        if (!req.user || (!req.user.isBusiness && !req.user.isAdmin)) {
            return res.status(403).json({ message: "Access denied. Only Business or Admin users can create cards." });
        }

        const validationMessage = validateCard(req.body);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const newCard = new Card({
            ...req.body,
            userId: req.user.id
        });

        logger.info(`User ${req.user.id} created a new card with ID ${newCard._id}`);
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        logger.error(`Error creating card: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
