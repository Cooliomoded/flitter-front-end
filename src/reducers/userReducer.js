const initialState = {
    currentUser: {}
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {

            case "CREATE_USER":
                return {
                    ...state, currentUser: action.user
                }

            default: 
                return state
            
    }
}