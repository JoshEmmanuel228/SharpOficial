import express from 'express';
import {
    getAllCultures,
    getCultureBySlug,
    createCulture,
    updateCulture,
    deleteCulture,
} from '../controllers/cultureController';

const router = express.Router();

// Public routes
router.get('/', getAllCultures);
router.get('/:slug', getCultureBySlug);

// Admin routes (TODO: Add authentication middleware)
router.post('/', createCulture);
router.put('/:slug', updateCulture);
router.delete('/:slug', deleteCulture);

export default router;
