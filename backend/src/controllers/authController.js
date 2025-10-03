const User = require('../models/User');
const generateToken = require('../utils/token'); 
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Only allow role assignment if superadmin creates user
        let userRole = 'user';
        if (role === 'admin' || role === 'superadmin') {
            if (!req.user || req.user.role !== 'superadmin') {
                return res.status(403).json({ message: 'Only Super Admin can create admin/superadmin accounts' });
            }
            userRole = role;
        }

        const user = new User({ username, email, password, role: userRole });
        await user.save();

        res.status(201).json({
            token: generateToken(user),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            token: generateToken(user),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCurrentUser = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
