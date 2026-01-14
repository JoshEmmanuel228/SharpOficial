import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music, Users, Disc3, Guitar } from 'lucide-react';
import { fetchAllCultures } from '../services/cultureService';

const Cultures = () => {
    const [cultures, setCultures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCultures = async () => {
            try {
                setLoading(true);
                const data = await fetchAllCultures();
                setCultures(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar las culturas. Por favor, intenta de nuevo.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCultures();
    }, []);

    // Icons for different cultures
    const cultureIcons = {
        reggae: Music,
        punk: Guitar,
        skinhead: Users,
        rock: Disc3,
    };

    // Color schemes for different cultures
    const cultureColors = {
        reggae: 'from-green-600 to-yellow-500',
        punk: 'from-pink-600 to-purple-600',
        skinhead: 'from-gray-700 to-gray-900',
        rock: 'from-red-600 to-orange-600',
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-secondary mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Cargando culturas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-primary opacity-50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black mb-6">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                CULTURA
                            </span>
                            <span className="block text-secondary">SUBTERRÁNEA</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            Explora las subculturas que han definido generaciones. Desde los ritmos del reggae hasta la rebeldía del punk,
                            cada movimiento tiene una historia que contar.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cultures Grid */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {cultures.map((culture) => {
                        const Icon = cultureIcons[culture.slug] || Music;
                        const colorGradient = cultureColors[culture.slug] || 'from-gray-600 to-gray-800';

                        return (
                            <Link
                                key={culture._id}
                                to={`/culture/${culture.slug}`}
                                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-secondary transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-2xl"
                            >
                                {/* Background Image with Overlay */}
                                <div className="h-48 relative overflow-hidden">
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundImage: `url(/images/${culture.slug}.jpg)` }}
                                    ></div>

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-60 group-hover:opacity-40 transition-opacity`}></div>

                                    {/* Dark Overlay for better text contrast */}
                                    <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>

                                    {/* Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon size={80} className="text-white opacity-70 group-hover:opacity-90 transition-opacity drop-shadow-lg" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h2 className="text-3xl font-black mb-4 text-white group-hover:text-secondary transition-colors">
                                        {culture.name}
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed line-clamp-4">
                                        {culture.description}
                                    </p>
                                    <div className="mt-6 flex items-center text-secondary font-bold group-hover:gap-3 gap-2 transition-all">
                                        Explorar
                                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Empty State */}
                {cultures.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-500">No hay culturas disponibles aún.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Cultures;
