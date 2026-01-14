import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder_id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_secret',
            callbackURL: 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists by email (link accounts)
                user = await User.findOne({ email: profile.emails?.[0].value });

                if (user) {
                    // Update existing user using findOneAndUpdate
                    user = await User.findOneAndUpdate(
                        { email: user.email },
                        { googleId: profile.id }
                    );
                    return done(null, user as any);
                }

                // Create new user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails?.[0].value || '',
                    googleId: profile.id,
                    password: '', // No password for Google users
                    isAdmin: false,
                    createdAt: new Date()
                });

                done(null, newUser as any);
            } catch (error) {
                done(error, undefined);
            }
        }
    )
);

export default passport;
