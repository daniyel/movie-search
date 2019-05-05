import {
    SEARCH_MOVIES,
    SEARCH_MOVIES_ERROR,
    SEARCH_MOVIES_LOADING
} from '../constants/ActionTypes';

const initialState = {
    movies: [],
    status: 'initial',
    error: ''
};

const rootReducer = (state = initialState, action) => {
    if (action.type === SEARCH_MOVIES) {
        const { payload } = action;

        return Object.assign({}, state, {
            movies: payload,
            status: 'success'
        });
    }

    if (action.type === SEARCH_MOVIES_ERROR) {
        const { error } = action;

        return Object.assign({}, state, {
            error,
            status: 'error'
        });
    }

    if (action.type === SEARCH_MOVIES_LOADING) {
        return Object.assign({}, state, {
            status: 'loading'
        });
    }

    return state;
};

export default rootReducer;
