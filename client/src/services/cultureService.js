import axios from 'axios';
import { API_URL } from '../config';

const CULTURE_URL = `${API_URL}/cultures`;

// Fetch all cultures
// Fetch all cultures
export const fetchAllCultures = async () => {
    try {
        const response = await axios.get(CULTURE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching cultures:', error);
        throw error;
    }
};

// Fetch single culture by slug
export const fetchCultureBySlug = async (slug) => {
    try {
        const response = await axios.get(`${CULTURE_URL}/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching culture ${slug}:`, error);
        throw error;
    }
};

// Create new culture (admin)
export const createCulture = async (cultureData) => {
    try {
        const response = await axios.post(CULTURE_URL, cultureData);
        return response.data;
    } catch (error) {
        console.error('Error creating culture:', error);
        throw error;
    }
};

// Update culture (admin)
export const updateCulture = async (slug, cultureData) => {
    try {
        const response = await axios.put(`${CULTURE_URL}/${slug}`, cultureData);
        return response.data;
    } catch (error) {
        console.error(`Error updating culture ${slug}:`, error);
        throw error;
    }
};

// Delete culture (admin)
export const deleteCulture = async (slug) => {
    try {
        const response = await axios.delete(`${CULTURE_URL}/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting culture ${slug}:`, error);
        throw error;
    }
};
