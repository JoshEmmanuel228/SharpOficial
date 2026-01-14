import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import authService from '../services/authService';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe, Loader } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext); // Re-use login to update context user
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        beltSize: '',
        country: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                age: user.age || '',
                beltSize: user.beltSize || '',
                country: user.country || '',
                address: user.address || ''
            });
            setLoading(false);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            const updatedUser = await authService.updateProfile(formData, token);

            // Update local storage and context
            localStorage.setItem('user', JSON.stringify(updatedUser));
            // We can trick context update by "logging in" again or just reloading, 
            // but ideally AuthContext should expose a setUser. 
            // Since we don't have setUser exposed, we can reload window or rely on parent check.
            window.location.reload();

            setMessage('Perfil actualizado correctamente');
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error al actualizar perfil');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white text-center mt-20"><Loader className="animate-spin mx-auto" /></div>;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto text-white">
            <h1 className="text-4xl font-bold mb-8 text-center">Mi Perfil</h1>

            <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 border border-gray-800 shadow-2xl">
                {message && (
                    <div className={`p-4 mb-6 rounded ${message.includes('Error') ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="col-span-full mb-4 border-b border-gray-800 pb-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2 text-secondary">
                            <User size={20} /> Información Personal
                        </h3>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-800 rounded p-3 text-white border border-gray-700 focus:border-secondary transition-colors outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email (No editable)</label>
                        <div className="flex items-center bg-gray-800/50 rounded p-3 text-gray-500 border border-gray-700 cursor-not-allowed">
                            <Mail size={16} className="mr-2" />
                            {formData.email}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Teléfono</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 text-gray-500" size={16} />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+52 000 000 0000"
                                className="w-full bg-gray-800 rounded p-3 pl-10 text-white border border-gray-700 focus:border-secondary transition-colors outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Edad</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full bg-gray-800 rounded p-3 text-white border border-gray-700 focus:border-secondary transition-colors outline-none"
                        />
                    </div>

                    {/* Specifics */}
                    <div className="col-span-full mt-6 mb-4 border-b border-gray-800 pb-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2 text-secondary">
                            <Globe size={20} /> Detalles de Envío
                        </h3>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">País de Residencia</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full bg-gray-800 rounded p-3 text-white border border-gray-700 focus:border-secondary transition-colors outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Talla de Cinturón (Predeterminada)</label>
                        <select
                            name="beltSize"
                            value={formData.beltSize}
                            onChange={handleChange}
                            className="w-full bg-gray-800 rounded p-3 text-white border border-gray-700 focus:border-secondary transition-colors outline-none appearance-none"
                        >
                            <option value="">Seleccionar Talla</option>
                            {[30, 32, 34, 36, 38, 40, 42].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-full">
                        <label className="block text-gray-400 text-sm mb-2">Dirección de Envío Completa</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-gray-500" size={16} />
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Calle, Número, Colonia, Ciudad, Código Postal"
                                className="w-full bg-gray-800 rounded p-3 pl-10 text-white border border-gray-700 focus:border-secondary transition-colors outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div className="col-span-full mt-6 flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={saving}
                            className="bg-secondary text-black font-bold py-3 px-8 rounded shadow-lg hover:shadow-secondary/20 transition-all flex items-center gap-2"
                        >
                            {saving ? <Loader className="animate-spin" /> : 'Guardar Cambios'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
