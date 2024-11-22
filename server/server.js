import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, getReviewsForRestaurant } from './data/restaurants.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mount API Router
app.use('/api', apiRouter);

// Routes

// Index page (homepage)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Attractions page (static HTML)
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// Restaurants page (dynamic EJS)
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.render('restaurants', { restaurantData: restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Error loading restaurants');
    }
});

// Individual restaurant details page
app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.params.id);
        if (restaurant) {
            const reviews = await getReviewsForRestaurant(req.params.id);
            res.render('restaurant-details', { restaurant, reviews });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).send('Error loading restaurant details');
    }
});

// New restaurant form page
app.get('/new-restaurant', (req, res) => {
    res.render('new-restaurant');
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});