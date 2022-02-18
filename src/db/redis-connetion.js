const RedisService = require("../services/RedisService")
const config = require('../config/redis-config');

const redisConnection = new RedisService(config.host, config.port);

module.exports = redisConnection;