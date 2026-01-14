import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/productService';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center p-10">Loading products...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-accent">Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-dashed border-secondary">
                        <div className="h-64 overflow-hidden relative">
                            <img
                                src={product.imageUrls[0]}
                                alt={product.name}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            {product.inStock === false && (
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center">
                                    <span className="bg-red-600 text-white px-4 py-2 rounded text-2xl font-bold animate-pulse">
                                        SOLD OUT
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold text-white">{product.name}</h2>
                                <span className="bg-accent text-black px-2 py-1 rounded text-sm font-bold">${product.price}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">{product.brand} | {product.style}</p>
                            <p className="text-gray-300 mb-4 line-clamp-3">{product.description}</p>
                            <Link to={`/shop/${product.id}`} className="block w-full bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
