import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

const items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' },
    { id: 4, name: 'Item Four' },
    { id: 5, name: 'Item Five' },
    { id: 6, name: 'Item Six' },
];

// GET /items - Retrieve all items
router.get(
    '/items',
    asyncHandler(async (req, res) => {
        res.json({ status: 'success', data: items });
    }),
);

router.post(
    '/items',
    asyncHandler(async (req, res) => {
        if (!req.body.name) {
            return res.status(400).json({ status: 'error', message: 'Name is required' });
        }
        const newItem = { id: items.length + 1, name: req.body.name };
        items.push(newItem);
        res.status(201).json({ status: 'success', data: newItem });
    }),
);

export default router;
