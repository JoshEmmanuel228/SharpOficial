import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password || ''))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id as string),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
        createdAt: new Date()
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id as string),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: Request | any, res: Response) => {
    // FileStore doesn't have findById, use findOne
    const user = await User.findOne({ _id: req.user._id });

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            phone: user.phone,
            age: user.age,
            beltSize: user.beltSize,
            country: user.country,
            address: user.address,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: Request | any, res: Response) => {
    const user = await User.findOne({ _id: req.user._id });

    if (user) {
        // Update fields if provided in body, else keep existing
        const updatedFields = {
            name: req.body.name || user.name,
            email: req.body.email || user.email, // Usually email shouldn't be changed easily but allowable here
            phone: req.body.phone || user.phone,
            age: req.body.age || user.age,
            beltSize: req.body.beltSize || user.beltSize,
            country: req.body.country || user.country,
            address: req.body.address || user.address,
        };

        // If password is provided, handle hashing (optional feature for profile update)
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            (updatedFields as any).password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, updatedFields);

        // Return full updated profile
        res.json({
            _id: updatedUser?._id,
            name: updatedUser?.name,
            email: updatedUser?.email,
            isAdmin: updatedUser?.isAdmin,
            phone: updatedUser?.phone,
            age: updatedUser?.age,
            beltSize: updatedUser?.beltSize,
            country: updatedUser?.country,
            address: updatedUser?.address,
            token: generateToken(updatedUser?._id as string), // Refresh token
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
