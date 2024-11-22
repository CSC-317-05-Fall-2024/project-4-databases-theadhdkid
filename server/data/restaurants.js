import { pool } from '../config/database.js';

// Get all restaurants
const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants ORDER BY id');
        return result.rows;
    } catch (error) {
        console.error('Error getting restaurants:', error);
        throw error;
    }
};

// Get a specific restaurant by ID
const getRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        return result.rows[0]; // Return the first (and should be only) restaurant
    } catch (error) {
        console.error('Error getting restaurant:', error);
        throw error;
    }
};

// Create a new restaurant
const createRestaurant = async (newRestaurant) => {
    try {
        const { name, phone, address, photo } = newRestaurant;
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, address, photo || '/images/default-restaurant.jpg']
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

// Delete a restaurant
const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        return result.rows.length > 0; // Returns true if a restaurant was deleted
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
};

// Get reviews for a specific restaurant
const getReviewsForRestaurant = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY id',
            [id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
};

// Create a new review
const createReview = async (reviewData) => {
    try {
        const { rating, content, restaurant_id } = reviewData;
        const result = await pool.query(
            'INSERT INTO reviews (rating, content, restaurant_id) VALUES ($1, $2, $3) RETURNING *',
            [rating, content, restaurant_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

// Delete a review
const deleteReview = async (id) => {
    try {
        const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

export {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant,
    getReviewsForRestaurant,
    createReview,
    deleteReview
};