import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        getCartTotal
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-gray-900 border-l border-gray-800 z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col animate-in slide-in-from-right">

                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/95 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-secondary" />
                        <h2 className="text-xl font-bold text-white tracking-wide">Tu Carrito</h2>
                        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                            {cartItems.length} items
                        </span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingBag size={64} className="opacity-20" />
                            <p className="text-lg">Tu carrito está vacío</p>
                            <button
                                onClick={toggleCart}
                                className="text-secondary hover:underline"
                            >
                                Continuar comprando
                            </button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 bg-gray-800/30 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group">
                                <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.imageUrls[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-white text-sm line-clamp-2">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {item.style}
                                            {item.size && (
                                                <span className="block text-secondary font-semibold mt-1">
                                                    Talla: {item.size}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center gap-3 bg-gray-900 rounded-lg p-1 border border-gray-800">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-1 hover:text-secondary disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:text-secondary"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <p className="font-bold text-secondary">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-800 bg-gray-900 space-y-4">
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="font-bold text-white text-xl">${getCartTotal()}</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                            Impuestos y envíos calculados en el checkout
                        </p>
                        <button
                            onClick={() => {
                                toggleCart();
                                navigate('/checkout');
                            }}
                            className="w-full bg-gradient-to-r from-secondary to-yellow-600 text-primary font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-[0.98] uppercase tracking-wider"
                        >
                            Proceder al Pago
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
