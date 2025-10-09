import fs from "fs";
import path from "path";
import pool from "../config/db.js"; // ✅ must include .js extension
import { fileURLToPath } from "url";


// Needed to get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDB = async () => {
    // ✅ Ensure correct path relative to this file
    const filePath = path.join(__dirname, "init.sql");

    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`SQL file not found at: ${filePath}`);
        }

        console.log(`⏳ Reading SQL from: ${filePath}`);
        const sql = fs.readFileSync(filePath, "utf8");

        await pool.query(sql);
        console.log("✅ Database initialized successfully!");
    } catch (err) {
        console.error("❌ Error initializing DB:", err.message);
    } finally {
        await pool.end(); // close connection
    }
};

initDB();
