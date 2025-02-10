const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        console.log("🔹 Headers received:", req.headers); // ✅ בדיקה אם ה-Headers נשלחים

        const token = req.headers.authorization?.split(' ')[1];
        console.log("🔹 Extracted Token:", token); // ✅ בדיקה אם ה-Token נשלח נכון

        if (!token) {
            console.log("❌ No token provided!");
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token:", decoded); // ✅ בדיקה אם ה-Token מפוענח

        const user = await User.findById(decoded.id);
        console.log("🔹 Found User:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticate;
