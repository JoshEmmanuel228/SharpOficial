import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Globe, Heart, Scroll } from 'lucide-react';
import { fetchCultureBySlug } from '../services/cultureService';

const CultureDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [culture, setCulture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCulture = async () => {
            try {
                setLoading(true);
                const data = await fetchCultureBySlug(slug);
                setCulture(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar la cultura. Por favor, intenta de nuevo.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCulture();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-secondary mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Cargando...</p>
                </div>
            </div>
        );
    }

    if (error || !culture) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-500 mb-6">{error || 'Cultura no encontrada'}</p>
                    <button
                        onClick={() => navigate('/culture')}
                        className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors"
                    >
                        Volver a Culturas
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary text-white">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <Link
                    to="/culture"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors"
                >
                    <ArrowLeft size={20} />
                    Volver a Culturas
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-primary opacity-70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-secondary">
                            {culture.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                            {culture.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-5xl mx-auto space-y-16">
                    {/* Characteristics Section */}
                    <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-secondary rounded-xl">
                                <Music size={32} className="text-primary" />
                            </div>
                            <h2 className="text-4xl font-black">Características Principales</h2>
                        </div>

                        <div className="space-y-8">
                            {/* Origins */}
                            {culture.characteristics.origins && culture.characteristics.origins.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary mb-4">Orígenes</h3>
                                    <ul className="space-y-3">
                                        {culture.characteristics.origins.map((origin, index) => (
                                            <li key={index} className="text-gray-300 text-lg leading-relaxed flex items-start gap-3">
                                                <span className="text-secondary mt-1">•</span>
                                                <span>{origin}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Connection */}
                            {culture.characteristics.connection && (
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary mb-4">Conexión Cultural</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {culture.characteristics.connection}
                                    </p>
                                </div>
                            )}

                            {/* Themes */}
                            {culture.characteristics.themes && culture.characteristics.themes.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary mb-4">Temas Líricos</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {culture.characteristics.themes.map((theme, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 border border-gray-700 hover:border-secondary transition-colors"
                                            >
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Musical Style */}
                            {culture.characteristics.musicalStyle && (
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary mb-4">Estilo Musical</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {culture.characteristics.musicalStyle}
                                    </p>
                                </div>
                            )}

                            {/* Global Influence */}
                            {culture.characteristics.globalInfluence && (
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary mb-4">Influencia Global</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {culture.characteristics.globalInfluence}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Impact & Legacy Section */}
                    <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-accent rounded-xl">
                                <Globe size={32} className="text-white" />
                            </div>
                            <h2 className="text-4xl font-black">Impacto y Legado</h2>
                        </div>

                        <div className="space-y-8">
                            {/* UNESCO */}
                            {culture.impact.unesco && (
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-gray-800 rounded-lg">
                                            <Scroll size={24} className="text-secondary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-secondary mb-3">UNESCO</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            {culture.impact.unesco}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Cultural Identity */}
                            {culture.impact.culturalIdentity && (
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-gray-800 rounded-lg">
                                            <Heart size={24} className="text-secondary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-secondary mb-3">Identidad Cultural</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            {culture.impact.culturalIdentity}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Evolution */}
                            {culture.impact.evolution && (
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-gray-800 rounded-lg">
                                            <Music size={24} className="text-secondary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-secondary mb-3">Evolución</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            {culture.impact.evolution}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
                    <h3 className="text-3xl font-black mb-4">¿Quieres explorar más?</h3>
                    <p className="text-gray-400 mb-8 text-lg">
                        Descubre otras subculturas y su impacto en la música y la sociedad.
                    </p>
                    <Link
                        to="/culture"
                        className="inline-block bg-secondary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors"
                    >
                        Ver Todas las Culturas
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CultureDetail;
