import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import authService from '../services/authService';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); // Assuming useAuth() is a custom hook that wraps useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    // Check for token in URL (from Google redirect)
    useEffect(() => {
        const fetchGoogleUser = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            if (token) {
                try {
                    localStorage.setItem('token', token);
                    // Fetch user profile to ensure UI updates immediately
                    const userData = await authService.getProfile(token);
                    // Add token to userdata for consistency if needed, or structured like login response
                    const fullUserData = { ...userData, token };
                    localStorage.setItem('user', JSON.stringify(fullUserData));

                    // Force a small delay or reload to ensure context picks it up if it doesn't listen to storage events
                    // Or rely on window.location.href = '/' to reload app which triggers AuthContext init
                    window.location.href = '/';
                } catch (error) {
                    console.error('Failed to fetch google user profile', error);
                    setError('Error al iniciar sesión con Google');
                }
            }
        };
        fetchGoogleUser();
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Keep this for local error handling if needed, or remove if only alert is used
        try {
            await login(email, password); // Changed to pass email, password directly
            navigate('/');
        } catch (err) {
            console.error('Login failed', err);
            setError(err.message || 'Credenciales inválidas'); // Use setError for consistency with existing UI
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-0"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800 relative z-10"
            >
                <h2 className="text-3xl font-black text-white mb-6 text-center">Iniciar Sesión</h2>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded mb-6 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Continuar con Google
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-900 text-gray-400">O con correo</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-secondary text-black font-bold py-3 rounded hover:bg-yellow-400 transition-colors uppercase"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account? <Link to="/register" className="text-secondary hover:underline">Register</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
