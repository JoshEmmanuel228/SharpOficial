import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, User, Search, X } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useCart } from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getCartCount, toggleCart } = useCart();
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <nav className="bg-primary/30 backdrop-blur-lg border-b border-white/10 text-white p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-tighter">
                        <span className="text-white">SHARP</span>
                        <span className="text-accent">OFFICIAL</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 font-medium">
                        <Link to="/" className="hover:text-secondary transition-colors">Inicio</Link>
                        <Link to="/culture" className="hover:text-secondary transition-colors">Cultura</Link>
                        <Link to="/shop" className="hover:text-secondary transition-colors">Marketplace</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hover:text-secondary transition-colors"
                        >
                            <Search size={24} />
                        </button>

                        {user ? (
                            <div className="relative group hidden md:block">
                                <Link to="/profile" className="hover:text-secondary transition-colors flex items-center gap-2">
                                    <User size={24} />
                                    <span className="text-sm font-bold hidden group-hover:inline transition-opacity duration-300">{user.name}</span>
                                </Link>
                                <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                                    <div className="bg-gray-900 rounded-md shadow-lg py-1 border border-gray-800">
                                        <Link
                                            to="/profile"
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                                        >
                                            Mi Perfil
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-secondary transition-colors hidden md:block">
                                <User size={24} />
                            </Link>
                        )}

                        <button
                            onClick={toggleCart}
                            className="hover:text-secondary transition-colors relative"
                        >
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-xs rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden hover:text-secondary transition-colors z-50 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
                        <Link
                            to="/"
                            className="text-lg font-medium hover:text-secondary transition-colors border-b border-gray-800 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/culture"
                            className="text-lg font-medium hover:text-secondary transition-colors border-b border-gray-800 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Cultura
                        </Link>
                        <Link
                            to="/shop"
                            className="text-lg font-medium hover:text-secondary transition-colors border-b border-gray-800 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Marketplace
                        </Link>

                        {/* Mobile Auth Links */}
                        <div className="pt-2 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 text-gray-300 hover:text-white"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User size={20} />
                                        <span>Mi Perfil ({user.name})</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-left text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-secondary hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User size={20} />
                                    <span>Iniciar Sesión</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;
