export default function logoutReducer(state = [], action) {
    switch(action.type) {
        case 'LOGOUT_USER':
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {}
            }
        default:
            return state
    }
}