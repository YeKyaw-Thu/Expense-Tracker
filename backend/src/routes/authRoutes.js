const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const requireRole = require('../middlewares/roleMiddleware');

router.post('/register', authController.register);
router.post('/register-admin', authMiddleware, requireRole('superadmin'), authController.register);

router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.getCurrentUser); // protected

module.exports = router;
