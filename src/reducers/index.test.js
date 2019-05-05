import rootReducer from './index';
import * as types from '../constants/ActionTypes';

describe('root reducer', () => {
    it('should return the initial state', () => {
        expect(rootReducer(undefined, {})).toEqual({
            movies: [],
            status: 'initial',
            error: ''
        });
    });

    it('should handle SEARCH_MOVIES', () => {
        expect(
            rootReducer([], {
                type: types.SEARCH_MOVIES,
                payload: [
                    {
                        Poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg',
                        Title: 'Set It Up',
                        Type: 'movie',
                        Year: '2018',
                        imdbID: 'tt5304992'
                    }
                ]
            })
        ).toEqual({
            movies: [
                {
                    Poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg',
                    Title: 'Set It Up',
                    Type: 'movie',
                    Year: '2018',
                    imdbID: 'tt5304992'
                }
            ],
            status: 'success'
        });
    });

    it('should handle SEARCH_MOVIES_ERROR', () => {
        expect(
            rootReducer([], {
                type: types.SEARCH_MOVIES_ERROR,
                error: new Error('error')
            })
        ).toEqual({
            status: 'error',
            error: expect.any(Error)
        });
    });

    it('should handle SEARCH_MOVIES_LOADING', () => {
        expect(
            rootReducer([], {
                type: types.SEARCH_MOVIES_LOADING
            })
        ).toEqual({
                status: 'loading'
        });
    });
});
