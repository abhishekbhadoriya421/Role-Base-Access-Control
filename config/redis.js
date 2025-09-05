const { createClient } = require('redis');


const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on("error", (err) => console.error("Error While Connecting to Redis: ", err));

redisClient.on("connect", () => {
    console.log("🔌 Redis client connected");
});

redisClient.on("ready", () => {
    console.log("✅ Redis is ready to use");
});


const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    } catch (err) {
        console.log(err);
    }

}


module.exports = { redisClient, connectRedis };