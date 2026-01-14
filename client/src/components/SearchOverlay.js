import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/productService';
import { fetchAllCultures } from '../services/cultureService';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [cultures, setCultures] = useState([]);
    const [results, setResults] = useState({ products: [], cultures: [] });
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Focus input when opened
            setTimeout(() => inputRef.current?.focus(), 100);

            // Fetch data
            const loadData = async () => {
                try {
                    const [productsData, culturesData] = await Promise.all([
                        getAllProducts(),
                        fetchAllCultures()
                    ]);
                    setProducts(productsData);
                    setCultures(culturesData);
                } catch (error) {
                    console.error("Error loading search data:", error);
                }
            };
            loadData();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults({ products: [], cultures: [] });
            return;
        }

        const term = searchTerm.toLowerCase();

        const getScore = (item) => {
            let score = 0;
            const name = item.name.toLowerCase();
            const description = item.description ? item.description.toLowerCase() : '';
            const style = item.style ? item.style.toLowerCase() : '';

            // Exact name match gets highest priority
            if (name === term) score += 100;
            // Name starts with term
            else if (name.startsWith(term)) score += 50;
            // Name contains term
            else if (name.includes(term)) score += 20;

            // Description contains term (lower priority)
            if (description.includes(term)) score += 5;

            // Style contains term
            if (style.includes(term)) score += 10;

            return score;
        };

        const filteredProducts = products
            .map(p => ({ ...p, score: getScore(p) }))
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5); // Limit results

        const filteredCultures = cultures
            .map(c => ({ ...c, score: getScore(c) }))
            .filter(c => c.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        setResults({ products: filteredProducts, cultures: filteredCultures });
    }, [searchTerm, products, cultures]);

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
        setSearchTerm('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="container mx-auto p-6 max-w-4xl h-full flex flex-col">
                <div className="flex justify-end mb-8">
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={32} />
                    </button>
                </div>

                <div className="relative mb-12">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar productos o culturas..."
                        className="w-full bg-gray-800 border-2 border-transparent focus:border-secondary text-white text-2xl placeholder-gray-500 rounded-2xl py-6 pl-14 pr-6 outline-none transition-all shadow-xl"
                    />
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                    {searchTerm && results.products.length === 0 && results.cultures.length === 0 && (
                        <div className="text-center text-gray-500 mt-20">
                            <p className="text-xl">No se encontraron resultados para "{searchTerm}"</p>
                        </div>
                    )}

                    {results.products.length > 0 && (
                        <div>
                            <h3 className="text-secondary font-bold text-sm tracking-wider uppercase mb-4 pl-2 border-l-4 border-secondary">Productos</h3>
                            <div className="grid gap-4">
                                {results.products.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleNavigate(`/shop/${product.slug || product.id}`)}
                                        className="bg-gray-800/50 hover:bg-gray-800 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border border-transparent hover:border-gray-700 group"
                                    >
                                        <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-lg group-hover:text-secondary transition-colors">{product.name}</h4>
                                            <p className="text-gray-400 text-sm">{product.style} • ${product.price}</p>
                                        </div>
                                        <ChevronRight className="text-gray-500 group-hover:text-secondary" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.cultures.length > 0 && (
                        <div>
                            <h3 className="text-accent font-bold text-sm tracking-wider uppercase mb-4 pl-2 border-l-4 border-accent">Culturas</h3>
                            <div className="grid gap-4">
                                {results.cultures.map(culture => (
                                    <div
                                        key={culture.slug}
                                        onClick={() => handleNavigate(`/culture/${culture.slug}`)}
                                        className="bg-gray-800/50 hover:bg-gray-800 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border border-transparent hover:border-gray-700 group"
                                    >
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-lg group-hover:text-accent transition-colors uppercase">{culture.name}</h4>
                                            <p className="text-gray-400 text-sm line-clamp-2">{culture.description}</p>
                                        </div>
                                        <ChevronRight className="text-gray-500 group-hover:text-accent" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
