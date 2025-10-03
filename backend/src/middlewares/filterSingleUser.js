const User = require('../models/User');

const filterSingleUser = () => {
    return async (req, res, next) => {
        try {
            const userId = req.params.id;

            // Normal user can only access self
            if (req.user.role === 'user' && req.user.id !== userId) {
                return res.status(403).json({ message: "Forbidden" });
            }

            // Admin can access only normal users
            if (req.user.role === 'admin') {
                const targetUser = await User.findById(userId);
                if (!targetUser) return res.status(404).json({ message: "User not found" });
                if (targetUser.role !== 'user') {
                    return res.status(403).json({ message: "Forbidden" });
                }
            }

            // Superadmin can access anyone
            next();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
};

module.exports = filterSingleUser;
