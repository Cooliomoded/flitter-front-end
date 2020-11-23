const initialState = {
    currentUser: {}
}

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_USER':
            return {
                ...state, currentUser: action.user
            }
        default:
            return state
    }
}