const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');
const filterUsers = require('../middlewares/filterUsers');
const filterSingleUser = require('../middlewares/filterSingleUser');

router.get(
    '/',
    protect,
    requireRole('admin', 'superadmin'),
    filterUsers(),
    userController.getAllUsers
);

router.get('/:id', protect, filterSingleUser(), userController.getUserById);
router.put('/:id', protect, filterSingleUser(), userController.updateUser);
router.delete('/:id', protect, requireRole('admin', 'superadmin'), filterSingleUser(), userController.deleteUser);

module.exports = router;
