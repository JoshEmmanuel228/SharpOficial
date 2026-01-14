import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Generate JWT
        const user: any = req.user;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '30d',
        });

        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/login?token=${token}`);
    }
);

export default router;
