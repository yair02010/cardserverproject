const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    }, 
    lastname: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    image: {
        url: {
            type: String,
            required: true,
            match: /^https?:\/\/.*\.(?:png|jpg)$/,
        },
        alt: {
            type: String,
            required: false,
        }
    },
    address: {
        state: { type: String, required: true, match: /^[a-zA-Z]+$/ },
        country: { type: String, required: true, match: /^[a-zA-Z]+$/ },
        city: { type: String, required: true, match: /^[a-z A-Z]+$/ },
        street: { type: String, required: true, match: /^[a-zA-Z0-9\s]+$/ },
        zip: { type: String, required: true, match: /^[0-9]+$/ },
        homeNum: { type: String, required: true, match: /^[0-9]+$/ },
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
