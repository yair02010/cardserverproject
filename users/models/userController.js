const User = require("../models/mongoDB/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../../auth/authenticateToken");
const loginValidation = require("../validation/joi/loginValidation");
const validateRegistration = require("../validation/joi/registerValidation");
const validateUpdate = require("../validation/joi/updateValdation");

exports.getAllUsers = async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const validationMessage = validateRegistration(req.body);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const validationMessage = validateUpdate(req.body);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        if (!req.user) {
            return res.status(403).json({ message: "Unauthorized - No user authenticated" });
        }

        if (req.user.id !== id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Unauthorized - No user authenticated" });
        }

        const requestingUser = await User.findById(req.user.id);
        if (!requestingUser || !requestingUser.isAdmin) {
            return res.status(403).json({ message: "Access denied. Only admins can delete users." });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validationMessage = loginValidation(email, password);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "user not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};