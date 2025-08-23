// utils/db.js
import { Pool } from "pg";

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     max: 20, // Max number of clients in the pool
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 5000,
// });

// online db 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // important for Neon
});

export default pool;
