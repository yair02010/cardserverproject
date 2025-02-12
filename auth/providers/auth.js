        const jwt = require('jsonwebtoken');
    const User = require('../../users/models/mongoDB/User');
        const authenticate = async (req, res, next) => {
            try {
                console.log("🔹 Headers received:", req.headers)

                const token = req.headers.authorization?.split(' ')[1];
                console.log("🔹 Extracted Token:", token); 

                if (!token) {
                    console.log("❌ No token provided!");
                    return res.status(401).json({ message: "Unauthorized - No token provided" });
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("🔹 Decoded Token:", decoded); 

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
