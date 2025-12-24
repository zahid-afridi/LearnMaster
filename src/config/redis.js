import Redis from "ioredis";

// Create Redis client using the REDIS_URL from .env
const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // Prevent certain errors on busy servers
  enableOfflineQueue: true,    // Queue commands while Redis is reconnecting
});

// Event listeners
redis.on("connect", () => console.log(" Connected to Redis"));
redis.on("ready", () => console.log("Redis is ready to use"));
// console.log("Errorororoor");

redis.on("error", (err) => console.error("Redis error:", err));
redis.on("end", () => console.log("Redis connection closed"));

// Optional: handle reconnecting
redis.on("reconnecting", (time) => console.log(`Reconnecting to Redis in ${time}ms`));

export default redis;
