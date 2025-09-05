const { redisClient } = require('../config/redis');

/**
 * TTL => Time To Live
 */
const setCache = async (key, value, ttl) => {
    try {
        await redisClient.setEx(key, ttl, JSON.stringify(value));
        console.log("Data has been cached: ");
        return value;
    } catch (err) {
        console.log("From Redis: ", err);
    }
}


const getCache = async (key) => {
    try {
        const value = await redisClient.get(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return false;
        }
    } catch (err) {
        console.log("From Redis: ", err);
    }
}


module.exports = { setCache, getCache }