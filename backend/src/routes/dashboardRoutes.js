const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');
const dashboardController = require('../controllers/dashboardController');


router.get('/user', protect, requireRole('user', 'admin', 'superadmin'), dashboardController.getUserDashboard);

router.get('/admin', protect, requireRole('admin', 'superadmin'), dashboardController.getAdminDashboard);

router.get('/superadmin', protect, requireRole('superadmin'), dashboardController.getSuperAdminDashboard);

module.exports = router;
