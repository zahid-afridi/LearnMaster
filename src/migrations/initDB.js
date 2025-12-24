import fs from "fs/promises";
import path from "path";
import pool from "../config/db.js"; // include .js
import { fileURLToPath } from "url";

// ========================
// ESM __dirname Setup
// ========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================
// Initialize Database
// ========================
const initDB = async () => {
  const filePath = path.join(__dirname, "init.sql");

  try {
    // Check if SQL file exists
    await fs.access(filePath);
    console.log(` Reading SQL from: ${filePath}`);

    // Read SQL file asynchronously
    const sql = await fs.readFile(filePath, "utf8");

    if (!sql.trim()) {
      throw new Error("SQL file is empty!");
    }

    // Execute SQL queries
    await pool.query(sql);
    console.log(" Database initialized successfully!");
  } catch (err) {
    console.error(" Error initializing DB:", err.message);
  } finally {
    try {
      await pool.end(); // safely close DB connection
      console.log("Database connection closed.");
    } catch (closeErr) {
      console.error("Error closing DB connection:", closeErr.message);
    }
  }
};

// Execute init
initDB();
