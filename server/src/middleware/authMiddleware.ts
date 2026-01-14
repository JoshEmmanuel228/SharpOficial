import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: any;
}

export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            // FileStore findOne returns object, no need for .select('-password') as we handle that manually or just attach user
            const user = await User.findOne({ _id: decoded.id });

            // Remove password before attaching to req
            if (user) {
                const { password, ...userWithoutPassword } = user;
                req.user = userWithoutPassword;
            } else {
                req.user = null;
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
