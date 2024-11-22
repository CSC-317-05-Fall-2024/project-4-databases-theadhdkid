import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

const dropTables = async () => {
    try {
        // Drop reviews first because it depends on restaurants
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
        console.log('Tables dropped successfully');
    } catch (error) {
        console.log('Error dropping tables:', error);
    }
}

const createTables = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                address VARCHAR(200) NOT NULL,
                photo VARCHAR(200)
            );

            CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                content TEXT NOT NULL
            );
        `;
        await pool.query(createTableQuery);
        console.log('Tables created successfully');
    } catch (error) {
        console.log('Error creating tables:', error);
    }
}

const insertData = async () => {
    try {
        // First insert restaurants
        const insertRestaurantsQuery = `
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES 
            ('Sorn', '123-456-7890', '123 Main St, Bangkok', '/images/sorn.jpg'),
            ('Sawaan', '098-765-4321', '456 Oak St, Bangkok', '/images/sawaan.jpg'),
            ('Nusara', '111-222-3333', '789 Pine St, Bangkok', '/images/nusara.jpg'),
            ('Haoma', '789-985-4598', '101 River View, Bangkok', '/images/haoma.jpg'),
            ('Khao', '789-785-8888', '303 Night Bazaar, Bangkok', '/images/khao.jpg'),
            ('Maze', '456-789-1234', '202 Skyline Ave, Bangkok', '/images/maze.jpg')
            RETURNING id;
        `;
        const restaurantResult = await pool.query(insertRestaurantsQuery);
        console.log('Restaurants inserted successfully');

        // Insert reviews using parameterized queries
        const reviewsData = [
            [1, 5, 'Authentic Thai food!! The flavors are incredible here.'],
            [1, 4, 'Love the atmosphere and their service. Slightly pricey but so worth it.'],
            [2, 5, 'Best Thai food I have ever had! Saying that after staying in Bangkok my whole life.'],
            [2, 4, 'Beautiful presentation and very spicy food.'],
            [3, 3, 'Food was good. Wait time is too long on weekends, make sure you reserve.'],
            [4, 4, 'Interior was really pretty, ambiance is everything for me and the food definitely did not dissappoint.'],
            [6, 2, 'Very arrogant waiters, food was okayish but I cannot bear bad customer service'],
        ];

        for (const [restaurantId, rating, content] of reviewsData) {
            await pool.query(
                'INSERT INTO reviews (restaurant_id, rating, content) VALUES ($1, $2, $3)',
                [restaurantId, rating, content]
            );
        }
        console.log('Reviews inserted successfully');
    } catch (error) {
        console.log('Error inserting data:', error);
    }
}

const checkData = async () => {
    try {
        const reviewsResult = await pool.query('SELECT * FROM reviews');
        console.log('\nReviews in database:', reviewsResult.rows);
        
        const restaurantsResult = await pool.query('SELECT * FROM restaurants');
        console.log('\nNumber of restaurants:', restaurantsResult.rows.length);
    } catch (error) {
        console.log('Error checking data:', error);
    }
}

const setup = async () => {
    console.log('Starting database setup...');
    await dropTables();
    await createTables();
    await insertData();
    await checkData();
    console.log('Database seeded successfully!');
    process.exit(0);
}

setup();
