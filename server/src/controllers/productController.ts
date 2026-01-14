import { Request, Response } from 'express';
import products from '../data/products.json';

export const getProducts = (req: Request, res: Response) => {
    try {
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: String(error) });
    }
};

export const getProductById = (req: Request, res: Response) => {
    try {
        const idOrSlug = req.params.id;
        console.log(`[DEBUG] getProductById called with param: "${idOrSlug}"`);
        let product;

        // Check if idOrSlug is a number (ID) or string (slug)
        if (!isNaN(Number(idOrSlug))) {
            const id = parseInt(idOrSlug);
            console.log(`[DEBUG] Searching by ID: ${id}`);
            product = products.find((p) => p.id === id);
        } else {
            // Search by slug using loose matching if exact match fails, but start with exact
            console.log(`[DEBUG] Searching by slug: "${idOrSlug}"`);
            product = products.find((p) => (p as any).slug === idOrSlug);
        }

        console.log(`[DEBUG] Product found:`, product ? product.name : 'null');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};
