import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register({ name, email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to register');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-0"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800 relative z-10"
            >
                <h2 className="text-3xl font-black text-white mb-6 text-center">REGISTER</h2>
                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3 focus:outline-none focus:border-secondary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3 focus:outline-none focus:border-secondary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3 focus:outline-none focus:border-secondary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3 focus:outline-none focus:border-secondary"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-secondary text-black font-bold py-3 rounded hover:bg-yellow-400 transition-colors uppercase"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account? <Link to="/login" className="text-secondary hover:underline">Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
