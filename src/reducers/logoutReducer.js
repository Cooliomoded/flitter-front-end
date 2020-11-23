const initialState = {
    currentUser: {}
}

export default function logoutReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGOUT_USER':
            localStorage.removeItem('token')
            return {
                currentUser: {}
            }
        default:
            return state
    }
}