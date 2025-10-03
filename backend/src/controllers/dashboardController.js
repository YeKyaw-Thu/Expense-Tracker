const User = require('../models/User');

// User dashboard
exports.getUserDashboard = async (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, this is your User Dashboard.` });
};

// Admin dashboard
exports.getAdminDashboard = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json({ message: `Admin Dashboard`, users });
};

// Superadmin dashboard
exports.getSuperAdminDashboard = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.json({ message: `Super Admin Dashboard`, users, admins });
};
