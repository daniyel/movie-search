const asyncRedis = jest.genMockFromModule('async-redis');

const createClient = (obj) => {
    return {
        get: async(key) => {
            switch(key) {
                case '__req__/api/search?keyword=set':
                    return "{\"foo\":\"bar\"}";
                default:
                    return;
            }
        },
        set: async(key, value) => { },
        on: (event, cb) => { }
    }
};

asyncRedis.createClient = createClient;

module.exports = asyncRedis;
