import queryString from 'query-string';
import {
    SEARCH_MOVIES,
    SEARCH_MOVIES_ERROR,
    SEARCH_MOVIES_LOADING
} from '../constants/ActionTypes';

export const searchMovies = (payload) => {
    return async(dispatch) => {
        const { movieTitle } = payload;
        const params = queryString.stringify({
            keyword: movieTitle
        });

        dispatch({
            type: SEARCH_MOVIES_LOADING
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URI}?${params}`);
            const jsonResponse = await response.json();
            dispatch({
                type: SEARCH_MOVIES,
                payload: jsonResponse
            });
        } catch (err) {
            dispatch({
                type: SEARCH_MOVIES_ERROR,
                error: err.message
            });
        }
    };
}
