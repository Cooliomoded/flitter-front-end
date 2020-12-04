const initialState = {
    genres: [],
    requesting: false
}

export default function genreReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_GENRES':
        return {
            genres: action.genres
        }
        default:
            return state
    }
}