const initialState = {
    currentUser: {}
}


export default function loginReducer(state = initialState, action) {
    console.log(state, action)
    switch(action.type) {
        case 'LOGIN_USER':
            return {
                ...state, currentUser: action.user
                
            }
        default:
            return state
    }
}