import React, { useState, useEffect, useContext } from 'react';
import { useCart } from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        zipCode: '',
        deliveryDate: '',
        deliveryTime: '',
        deliveryStation: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cash'); // Default to cash
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.name || '',
                email: user.email || '',
                // other fields if available in user object
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            user: formData,
            cartItems,
            total: getCartTotal(),
            paymentMethod
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert('¡Orden procesada con éxito! Te hemos enviado un correo con los detalles.');
                clearCart();
                navigate('/');
            } else {
                alert('Hubo un error al procesar tu orden. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error de conexión. Verifica que el servidor esté corriendo.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                <Link to="/shop" className="text-secondary hover:underline">Ir a comprar</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 md:p-12">
            <h1 className="text-4xl font-bold mb-8 text-center text-accent">Finalizar Compra</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Formulario de Envío */}
                <div className="md:w-2/3 bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">1. Detalles de Entrega</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Nombre Completo</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Código Postal</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    required
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                            />
                        </div>

                        <div className="pt-6">
                            <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">2. Detalles de Entrega Personal</h2>
                            <p className="text-gray-400 mb-6 text-sm">Selecciona el horario y la estación del suburbano para tu entrega.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-gray-400 mb-1">Fecha de Entrega</label>
                                    <input
                                        type="date"
                                        name="deliveryDate"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.deliveryDate}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Hora de Entrega</label>
                                    <input
                                        type="time"
                                        name="deliveryTime"
                                        required
                                        value={formData.deliveryTime}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-400 mb-1">Estación de Entrega (Suburbano)</label>
                                <select
                                    name="deliveryStation"
                                    required
                                    value={formData.deliveryStation}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-secondary"
                                >
                                    <option value="" disabled>Selecciona una estación</option>
                                    <option value="Cuautitlán">Cuautitlán</option>
                                    <option value="Tultitlán">Tultitlán</option>
                                    <option value="Lechería">Lechería</option>
                                    <option value="San Rafael">San Rafael</option>
                                    <option value="Tlalnepantla">Tlalnepantla</option>
                                    <option value="Fortuna">Fortuna</option>
                                    <option value="Buenavista">Buenavista</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">3. Método de Pago</h2>

                            <div className="space-y-3 mb-6">
                                {/* Option 1: Cash / Contraentrega */}
                                <div
                                    onClick={() => handlePaymentMethodChange('cash')}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'cash'
                                        ? 'bg-gray-800 border-secondary ring-1 ring-secondary'
                                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-secondary' : 'border-gray-500'
                                        }`}>
                                        {paymentMethod === 'cash' && <div className="w-3 h-3 rounded-full bg-secondary"></div>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Efectivo / Contraentrega</p>
                                        <p className="text-sm text-gray-400">Paga en efectivo al recibir tu pedido.</p>
                                    </div>
                                </div>

                                {/* Option 2: Card (Disabled) */}
                                <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full border border-gray-600"></div>
                                    <div>
                                        <p className="font-bold text-gray-400">Tarjeta de Débito / Crédito</p>
                                        <p className="text-sm text-gray-500">Próximamente</p>
                                    </div>
                                </div>

                                {/* Option 3: Transfer (Disabled) */}
                                <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full border border-gray-600"></div>
                                    <div>
                                        <p className="font-bold text-gray-400">Transferencia Bancaria</p>
                                        <p className="text-sm text-gray-500">Próximamente</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-secondary to-yellow-600 hover:shadow-lg text-primary font-bold py-4 rounded-lg transition-all text-lg uppercase tracking-wide disabled:opacity-50"
                            >
                                {loading ? 'Procesando...' : `Confirmar y Pagar $${getCartTotal()}`}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Resumen del Pedido */}
                <div className="md:w-1/3">
                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 sticky top-24">
                        <h2 className="text-xl font-bold mb-4 text-white">Resumen del Pedido</h2>
                        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-800 pb-4">
                                    <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-bold text-white text-sm">{item.name}</p>
                                        <p className="text-gray-400 text-xs">Cant: {item.quantity}</p>
                                        {item.size && <p className="text-secondary text-xs">Talla: {item.size}</p>}
                                        <p className="text-accent text-sm font-bold mt-1">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-white border-t border-gray-800 pt-4">
                            <span>Total</span>
                            <span>${getCartTotal()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
