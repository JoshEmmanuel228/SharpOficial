import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useCart } from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
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
                            <div className="relative group">
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
                            <Link to="/login" className="hover:text-secondary transition-colors">
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
                        <button className="md:hidden hover:text-secondary">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;
