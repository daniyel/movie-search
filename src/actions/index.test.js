import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as types from '../constants/ActionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('creates SEARCH_MOVIES when fetching movies has been done', () => {
        const keyword = 'set';
        const body = [
            {
                Poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg',
                Title: 'Set It Up',
                Type: 'movie',
                Year: '2018',
                imdbID: 'tt5304992'
            }, {
                Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1NDgxMzM4Ml5BMl5BanBnXkFtZTcwNzA0NDMwMg@@._V1._CR19,0,327,448_SY132_CR3,0,89,132_AL_.jpg_V1_SX300.jpg',
                Title: 'Dead Set',
                Type: 'series',
                Year: '2008',
                imdbID: 'tt1285482'
            }
        ];
        fetchMock.getOnce(`${process.env.REACT_APP_API_URI}?keyword=${keyword}`, {
            body,
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            { type: types.SEARCH_MOVIES_LOADING },
            { type: types.SEARCH_MOVIES, payload: body }
        ];
        const store = mockStore({
            movies: [],
            status: 'initial',
            error: ''
        });

        return store.dispatch(actions.searchMovies({
            movieTitle: keyword
        })).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates SEARCH_MOVIES when fetching movies throws an error', () => {
        const keyword = 'set';
        fetchMock.getOnce(`${process.env.REACT_APP_API_URI}?keyword=${keyword}`, {
            throws: new Error('error'),
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            { type: types.SEARCH_MOVIES_LOADING },
            { type: types.SEARCH_MOVIES_ERROR, error: 'error' }
        ];
        const store = mockStore({
            movies: [],
            status: 'initial',
            error: ''
        });

        return store.dispatch(actions.searchMovies({
            movieTitle: keyword
        })).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
