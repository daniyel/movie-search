const httpMocks = require('node-mocks-http');
const cache = require('./cache');

describe('Middleware test', () => {
    describe('Valid arguments are passed', () => {
        it('should return uncached response', async() => {
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/api/search?keyword=foobar',
                query: {
                    keyword: 'set'
                }
            });
            const response = httpMocks.createResponse();
            const cacheMiddleware = cache();
            const nextSpy = jest.fn();

            await cacheMiddleware(request, response, nextSpy);
            expect(nextSpy).toHaveBeenCalled();
        });

        it('should return cached response', async() => {
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/api/search?keyword=set',
                query: {
                    keyword: 'set'
                }
            });
            const response = httpMocks.createResponse();
            const cacheMiddleware = cache();
            const nextSpy = jest.fn();

            await cacheMiddleware(request, response, nextSpy);
            expect(nextSpy).not.toHaveBeenCalled();
            expect(response.getHeader('cache-control')).toEqual('private, max-age=30');
            expect(response._getData()).toEqual(JSON.stringify({ 'foo': 'bar' }));
        });
    });
});
