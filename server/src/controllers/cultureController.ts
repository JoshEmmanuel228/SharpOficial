import { Request, Response } from 'express';
import Culture from '../models/Culture';

// @desc    Get all cultures
// @route   GET /api/cultures
// @access  Public
export const getAllCultures = async (req: Request, res: Response) => {
    try {
        console.log('[DEBUG] getAllCultures called');
        const cultures = await Culture.find().sort({ createdAt: -1 });
        console.log(`[DEBUG] Found ${cultures.length} cultures`);
        res.json(cultures);
    } catch (error) {
        console.error('Error fetching cultures:', error);
        res.status(500).json({ message: 'Error fetching cultures', error });
    }
};

// @desc    Get single culture by slug
// @route   GET /api/cultures/:slug
// @access  Public
export const getCultureBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const culture = await Culture.findOne({ slug });

        if (!culture) {
            return res.status(404).json({ message: 'Culture not found' });
        }

        res.json(culture);
    } catch (error) {
        console.error('Error fetching culture:', error);
        res.status(500).json({ message: 'Error fetching culture', error });
    }
};

// @desc    Create new culture
// @route   POST /api/cultures
// @access  Private (TODO: Add auth middleware)
export const createCulture = async (req: Request, res: Response) => {
    try {
        const culture = await Culture.create(req.body);
        res.status(201).json(culture);
    } catch (error) {
        console.error('Error creating culture:', error);
        res.status(500).json({ message: 'Error creating culture', error });
    }
};

// @desc    Update culture
// @route   PUT /api/cultures/:slug
// @access  Private (TODO: Add auth middleware)
export const updateCulture = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const culture = await Culture.findOneAndUpdate(
            { slug },
            req.body,
            { new: true, runValidators: true }
        );

        if (!culture) {
            return res.status(404).json({ message: 'Culture not found' });
        }

        res.json(culture);
    } catch (error) {
        console.error('Error updating culture:', error);
        res.status(500).json({ message: 'Error updating culture', error });
    }
};

// @desc    Delete culture
// @route   DELETE /api/cultures/:slug
// @access  Private (TODO: Add auth middleware)
export const deleteCulture = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const culture = await Culture.findOneAndDelete({ slug });

        if (!culture) {
            return res.status(404).json({ message: 'Culture not found' });
        }

        res.json({ message: 'Culture deleted successfully' });
    } catch (error) {
        console.error('Error deleting culture:', error);
        res.status(500).json({ message: 'Error deleting culture', error });
    }
};
