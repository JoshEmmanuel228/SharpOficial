import { API_URL } from '../config';

const PRODUCTS_URL = `${API_URL}/products`;

export const getAllProducts = async () => {
    try {
        console.log('[DEBUG] getAllProducts fetching from:', PRODUCTS_URL);
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        console.log(`[DEBUG] Fetching product from: ${PRODUCTS_URL}/${id}`);
        const response = await fetch(`${PRODUCTS_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
