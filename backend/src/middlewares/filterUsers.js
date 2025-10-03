const User = require('../models/User');

const filterUsers = () => {
    return async (req, res, next) => {
        try {
            let query = {};

            if (req.user.role === 'superadmin') {
                query = {};               //  all     
            } else if (req.user.role === 'admin') {
                query = { role: 'user' }; //  only normal users
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.userQuery = query; 
            next();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
};

module.exports = filterUsers;
