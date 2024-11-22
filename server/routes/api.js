import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, createReview, deleteReview } from '../data/restaurants.js';

const router = express.Router();

// GET all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        console.error('Error getting restaurants:', error);
        res.status(500).json({ message: 'Error fetching restaurants' });
    }
});

// GET single restaurant by ID
router.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error getting restaurant:', error);
        res.status(500).json({ message: 'Error fetching restaurant' });
    }
});

// POST new restaurant
router.post('/restaurants', async (req, res) => {
    try {
        const { name, phone, address, photo } = req.body;
        const newRestaurant = await createRestaurant({
            name,
            phone,
            address,
            photo: photo || '/images/default-restaurant.jpg'
        });
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ message: 'Error creating restaurant' });
    }
});

// DELETE restaurant
router.delete('/restaurants/:id', async (req, res) => {
    try {
        const deleted = await deleteRestaurant(Number(req.params.id));
        if (deleted) {
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ message: 'Error deleting restaurant' });
    }
});

// NEW ROUTES FOR REVIEWS

// Create a review
router.post('/reviews', async (req, res) => {
    try {
        const { rating, content, restaurant_id } = req.body;
        const newReview = await createReview({ rating, content, restaurant_id });
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Error creating review' });
    }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
    try {
        const deleted = await deleteReview(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

export default router;