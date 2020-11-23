const initialState = {
    currentUser: {}
}

export default function userReducer(state = initialState, action) {
    console.log('User Reducer')
    console.log(action)
    switch (action.type) {

            case "CREATE_USER":
                return {
                    ...state, currentUser: action.user
                }

            default: 
                return state
            
    }
}