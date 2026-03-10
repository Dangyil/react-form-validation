import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    updateProfile,
    verifyAuth } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.put('/update-profile', verifyToken, updateProfile);
router.get('/verify', verifyToken, verifyAuth);

export default router;