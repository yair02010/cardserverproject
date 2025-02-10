const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");

exports.getAllUsers = [
    authenticateToken,
    async (req, res) => {
        try {
            if (!req.user || !req.user.isAdmin) {
                return res.status(403).json({ message: "Access denied. Admins only." });
            }

            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];


// Get a user by ID
exports.getUserById = [
     authenticateToken,
      async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
                return res.status(403).json({ message: "Access denied. Admins only." });
            }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
];

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { firstname, middleName, lastname, email, password, phone, imageUrl, imageAlt, address, isBusiness, isAdmin } = req.body;

        if (!firstname || !lastname || !email || !password || !phone || !imageUrl || !address) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            middleName,
            lastname,
            email,
            password: hashedPassword,
            phone,
            imageUrl,
            imageAlt,
            address,
            isBusiness,
            isAdmin
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user) {
            return res.status(403).json({ message: "Unauthorized - No user authenticated" });
        }

        const userId = req.user.id;
        const isAdmin = req.user.isAdmin;

        if (userId !== id && !isAdmin) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
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

// Login and generate token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
