import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';

import ProductModel from '../components/ProductModel';
import AppointmentModal from '../components/AppointmentModal';

const ProductDetail = () => {
    const params = useParams();
    const { id } = params;
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [show3D, setShow3D] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                // Initialize size logic
                if (data && data.name.toLowerCase().includes('cintur')) {
                    setSelectedSize('32'); // Default belt size
                } else if (data) {
                    setSelectedSize(data.size || 'One Size');
                }
            } catch (err) {
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center p-10">Loading... (ID: {id})</div>;
    if (error) return (
        <div className="text-center p-10 flex flex-col items-center gap-4">
            <div className="text-red-500 text-xl font-bold">{error}</div>
            <div className="bg-gray-800 p-4 rounded text-left text-sm font-mono text-gray-300">
                <p>Debug Info:</p>
                <p>Requested ID: {id}</p>
                <p>URL Params: {JSON.stringify(params)}</p>
            </div>
            <Link to="/shop" className="text-secondary hover:underline">
                Volver al Marketplace
            </Link>
        </div>
    );
    if (!product) return <div className="text-center p-10">Product not found</div>;

    return (
        <div className="container mx-auto p-6">
            <Link to="/shop" className="text-accent hover:underline mb-4 inline-block">&larr; Volver al Marketplace</Link>
            <div className="bg-secondary rounded-lg overflow-hidden shadow-2xl border border-gray-700 flex flex-col md:flex-row">
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-black mb-4">{product.name}</h1>
                    <div className="flex items-center mb-6">
                        <span className="bg-accent text-black px-3 py-1 rounded text-lg font-bold mr-4">${product.price}</span>
                        <span className="text-gray-800 font-semibold">{product.brand} | {product.style}</span>
                        {product.inStock === false && (
                            <span className="bg-red-600 text-white px-3 py-1 rounded text-lg font-bold ml-auto animate-pulse">
                                AGOTADO / SOLD OUT
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-black mb-2">Descripción</h3>
                        <p className="text-gray-900 whitespace-pre-line font-medium">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <span className="text-gray-700 block text-sm font-bold">Talla</span>
                            {product.name.toLowerCase().includes('cintur') ? (
                                <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="bg-gray-800 text-white font-semibold rounded px-2 py-1 border border-gray-600 focus:outline-none focus:border-secondary"
                                >
                                    {[30, 32, 34, 36, 38, 40, 42].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            ) : (
                                <span className="text-black font-semibold">{product.size}</span>
                            )}
                            <span className="text-black font-semibold"></span>
                        </div>
                        <div>
                            <span className="text-gray-700 block text-sm font-bold">Color</span>
                            <span className="text-black font-semibold">{product.color}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <button
                                onClick={() => product.inStock !== false && addToCart({ ...product, size: selectedSize })}
                                disabled={product.inStock === false}
                                className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg uppercase tracking-wide ${product.inStock === false
                                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-secondary to-yellow-600 hover:shadow-lg hover:shadow-secondary/20 text-primary active:scale-95'
                                    }`}
                            >
                                {product.inStock === false ? 'AGOTADO' : 'Añadir al Carrito'}
                            </button>
                            {product.modelUrl && (
                                <button
                                    onClick={() => setShow3D(!show3D)}
                                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg border border-gray-600"
                                >
                                    {show3D ? 'Ver Imagen' : 'Ver en 3D'}
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg border border-gray-600 hover:border-secondary"
                        >
                            📅 Agendar Entrega / Visita
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-secondary relative">
                        {show3D && product.modelUrl ? (
                            <div className="w-full h-full flex flex-col gap-4">
                                <div className="relative flex-1 bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-secondary">
                                    <div className="absolute top-2 right-2 z-10 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                        Vista 3D Principal
                                    </div>
                                    <ProductModel
                                        modelUrl={product.modelUrl}
                                        rotation={
                                            product.modelUrl?.includes('CARTERABLANCA') ? [0, -Math.PI / 2, 0] :
                                                product.modelUrl?.includes('cinturondosollos') ? [0, -Math.PI / 2, 0] :
                                                    product.modelUrl?.includes('cintoclasic') ? [0, -Math.PI / 4, 0] :
                                                        product.modelUrl?.includes('cintocosblan') ? [0, -Math.PI / 2, 0] :
                                                            product.modelUrl?.includes('cintorojo') ? [0, -Math.PI / 2, 0] :
                                                                product.modelUrl?.includes('carterared') ? [0, -Math.PI / 2, 0] :
                                                                    product.modelUrl?.includes('cintoazu') ? [-Math.PI / 2, 0, 0] :
                                                                        undefined
                                        }
                                    />
                                </div>
                                {product.secondaryModelUrl && (
                                    <div className="relative flex-1 bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-secondary">
                                        <div className="absolute top-2 right-2 z-10 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                            Vista 3D Secundaria
                                        </div>
                                        <ProductModel modelUrl={product.secondaryModelUrl} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-secondary relative">
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </div>
    );
};

export default ProductDetail;
