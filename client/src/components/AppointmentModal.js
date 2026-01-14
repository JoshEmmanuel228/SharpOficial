import React, { useState } from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { X, Calendar, MapPin, Phone, User, CheckCircle, CreditCard, AlertCircle, Mail } from 'lucide-react';
import axios from 'axios';

import { API_URL } from '../config';

const AppointmentModal = ({ isOpen, onClose, product }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: new Date(),
        time: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            await axios.post(
                `${API_URL}/appointments`,
                {
                    ...formData,
                    product: product?.name,
                    price: product?.price
                },
                config
            );

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({
                    name: '',
                    phone: '',
                    address: '',
                    date: new Date(),
                    time: ''
                });
                onClose();
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al agendar la cita');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
                <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-secondary text-center shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Cita Confirmada!</h2>
                    <p className="text-gray-300 mb-6">
                        Hemos recibido tu solicitud. Te contactaremos 30 minutos antes de llegar a tu dirección.
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-secondary text-primary font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition duration-300"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto">
            <div className="relative bg-gray-900 rounded-2xl max-w-2xl w-full border border-gray-700 shadow-2xl my-8">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary rounded-lg">
                            <Calendar size={24} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Agendar Entrega</h2>
                            {product && <p className="text-sm text-secondary font-medium">{product.name} - ${product.price}</p>}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500">
                            <AlertCircle size={20} />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column: Date & Time */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Selecciona una Fecha</label>
                                <div className="relative pointer-events-auto">
                                    {/* Flatpickr needs specific styling overrides in pure CSS if Tailwind interferes, but usually works */}
                                    <Flatpickr
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                                        value={formData.date}
                                        onChange={([date]) => setFormData({ ...formData, date })}
                                        options={{
                                            locale: Spanish,
                                            minDate: "today",
                                            disable: [
                                                function (date) {
                                                    // return true to disable
                                                    return (date.getDay() === 0); // Disable Sundays if needed
                                                }
                                            ],
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Horario Disponible</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, time: slot })}
                                            className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${formData.time === slot
                                                ? 'bg-secondary text-primary shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Personal Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Teléfono de Contacto</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="55 1234 5678"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Dirección de Entrega</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                    <textarea
                                        required
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-secondary transition-colors min-h-[100px] resize-none"
                                        placeholder="Calle, Número, Colonia..."
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Payment Info */}
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex items-start gap-4">
                        <div className="p-2 bg-green-500/10 rounded-lg shrink-0">
                            <CreditCard size={24} className="text-green-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Pago contra entrega</h4>
                            <p className="text-xs text-gray-400 mb-1">
                                El pago se realiza al recibir el producto. Aceptamos Efectivo y Transferencias.
                            </p>
                            <span className="text-xs text-secondary font-medium block">
                                Te contactaremos 30 min antes de llegar.
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary text-primary font-black py-4 rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Procesando...' : 'CONFIRMAR CITA'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal;
