const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    web: { type: String, required: true },
    image: {
        url: { type: String, default: "" },
        alt: { type: String, default: "" },
    },
    address: {
        state: { type: String, default: "" },
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        houseNumber: { type: Number, required: true },
        zip: { type: String, required: true },
    },
    isBusiness: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    likes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
