const config = require('config');
const queryString = require('query-string');
const asyncRedis = require('async-redis');
const jsonify = require('redis-jsonify');

let redisClient = jsonify(asyncRedis.createClient({
    host: config.get('redis.host'),
    port: config.get('redis.port')
}));

redisClient.on('error', (err) => {
    console.log(`Redis error: ${err.message}`);
});

redisClient.on('ready', () => {
    console.log(`Redis ready`);
});

const cache = () => {
    return async(req, res, next) => {
        const parseUrl = queryString.parseUrl(req.url);
        const stringifyQuery = queryString.stringify(parseUrl.query);
        const cacheKey = `__req__${parseUrl.url}?${stringifyQuery}`;
        const cachedResponse = await redisClient.get(cacheKey);

        if (cachedResponse) {
            res.set('Cache-Control', `private, max-age=${config.get('cache.maxAge')}`);
            res.json(JSON.parse(cachedResponse));
            return;
        } else {
            res.sendResponse = res.send;
            res.send = async(body) => {
                await redisClient.set(cacheKey, body);
                res.sendResponse(body);
            }
            next();
        }
    };
};

module.exports = cache;
