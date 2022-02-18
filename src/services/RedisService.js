const redis = require("redis");
const config = require("../config/redis-config");

class RedisService {

    constructor(host, port) {
        this.host = host;
        this.port = port
        this.client = null;
        this.connected = false
    }

    async connect() {

        const url = `redis://${this.host}:${this.port}`;
        this.client = await redis.createClient(url)
        this.client.on('error', err => console.log('Redis error: ', err.message));
        this.client.on('connect', () => {
            console.log('Connected to redis server');
            this.connected = true
        });
        await this.client.connect()
        return this.client
    }

    async getCache(key) {
        if (!this.connected) {
            return null;
        }
        const post = await this.client.get(key)
        return JSON.parse(post)
    }

    async setCache(key, value) {
        if (!this.connected) {
            return null
        }
        this.client.set(key, JSON.stringify(value))
    }

    async delKey(key) {
        if (!this.connected) {
            return null
        }
        this.client.del(key)
    }
}

module.exports = RedisService;

