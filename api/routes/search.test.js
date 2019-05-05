const httpMocks = require('node-mocks-http');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const config = require('config');
const { index } = require('./search');

jest.mock('../middlewares/cache', () => () => ({}));

describe('Search Route', () => {
    describe('index() function', () => {
        it('Should return empty array, if no results are found', async() => {
            const mockAxios = new MockAdapter(axios);
            const keyword = 'set';
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/api/search?keyword=set',
                query: {
                    keyword
                }
            });
            const apikey = config.get('omdb.apiKey');
            const data1 = {
                Search: [
                    {
                        Title: 'Set It Up',
                        Year: '2018',
                        imdbID: 'tt5304992',
                        Type: 'movie',
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg'
                    }
                ],
                totalResults: 590,
                Response: 'True'
            };
            const data2 = {
                Search: [
                    {
                        Title: 'Dead Set',
                        Year: '2008',
                        imdbID: 'tt1285482',
                        Type: 'series',
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1NDgxMzM4Ml5BMl5BanBnXkFtZTcwNzA0NDMwMg@@._V1._CR19,0,327,448_SY132_CR3,0,89,132_AL_.jpg_V1_SX300.jpg'
                    }
                ],
                totalResults: 590,
                Response: 'True'
            };
            const data3 = {
                Search: [
                    {
                        Title: 'Set It Off',
                        Year: '1996',
                        imdbID: 'tt0117603',
                        Type: 'movie',
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMjA2MzUxODQ0Nl5BMl5BanBnXkFtZTcwNTQyNzEyMQ@@._V1_SX300.jpg'
                    }
                ],
                totalResults: 590,
                Response: 'True'
            };
            const response = httpMocks.createResponse();

            mockAxios
                .onGet(config.get('omdb.uri'), {
                    params: {
                        apikey,
                        s: keyword,
                        page: 1
                    }
                })
                .reply(200, data1)
                .onGet(config.get('omdb.uri'), {
                    params: {
                        apikey,
                        s: keyword,
                        page: 2
                    }
                })
                .reply(200, data2)
                .onGet(config.get('omdb.uri'), {
                    params: {
                        apikey,
                        s: keyword,
                        page: 3
                    }
                })
                .reply(200, data3);

            await index(request, response);
            expect(response._getData()).toEqual(
                JSON.stringify([...data1.Search, ...data2.Search,...data3.Search])
            );
        });

        it('Should return error, if error occurs', async() => {
            const mockAxios = new MockAdapter(axios);
            const keyword = 'set';
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/api/search?keyword=set',
                query: {
                    keyword
                }
            });
            const apikey = config.get('omdb.apiKey');
            const data1 = {
                Search: [
                    {
                        Title: 'Set It Up',
                        Year: '2018',
                        imdbID: 'tt5304992',
                        Type: 'movie',
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg'
                    }
                ],
                totalResults: 590,
                Response: 'True'
            };
            const data2 = {
                Search: [
                    {
                        Title: 'Dead Set',
                        Year: '2008',
                        imdbID: 'tt1285482',
                        Type: 'series',
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1NDgxMzM4Ml5BMl5BanBnXkFtZTcwNzA0NDMwMg@@._V1._CR19,0,327,448_SY132_CR3,0,89,132_AL_.jpg_V1_SX300.jpg'
                    }
                ],
                totalResults: 590,
                Response: 'True'
            };
            const data3 = {
                Search: [
                    {
                        Title: 'Set It Off',
                        Year: '1996',
                        imdbID: 'tt0117603',
                        Type: 'movie',
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMjA2MzUxODQ0Nl5BMl5BanBnXkFtZTcwNTQyNzEyMQ@@._V1_SX300.jpg'
                    }
                ],
                totalResults: 590,
                Response: 'True'
            };
            const response = httpMocks.createResponse();

            mockAxios
                .onGet(config.get('omdb.uri'), {
                    params: {
                        apikey,
                        s: keyword,
                        page: 1
                    }
                })
                .reply(400, data1)
                .onGet(config.get('omdb.uri'), {
                    params: {
                        apikey,
                        s: keyword,
                        page: 2
                    }
                })
                .reply(400, data2)
                .onGet(config.get('omdb.uri'), {
                    params: {
                        apikey,
                        s: keyword,
                        page: 3
                    }
                })
                .reply(400, data3);

            await index(request, response);
            expect(response._getData()).toEqual('Request failed with status code 400');
        });
    });
});
