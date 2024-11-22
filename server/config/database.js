/* Establish the DB connection pool here. */
import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables
dotenv.config();

const { Pool } = pg;

const config = {
    connectionString: process.env.CONNECTION_STRING
};

export const pool = new Pool(config);