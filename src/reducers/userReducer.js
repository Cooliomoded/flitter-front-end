const initialState = {
    currentUser: {}
}

export default function userReducer(state = initialState, action) {
    let idx
    let story
    switch (action.type) {

            case "CREATE_USER":
                return {
                    ...state, currentUser: action.user
                }
            
            case "ADD_USER_STORY":
                return {
                    ...state,
                    currentUser: {...state.currentUser,
                        stories: [...state.currentUser.stories, action.storyD]}
                }
            case "EDIT_USER_STORY":
                idx = state.currentUser.stories.findIndex(story => story.id === action.storyD.id)
                return {
                    ...state,
                    currentUser: {...state.currentUser,
                        stories: [...state.currentUser.stories.slice(0, idx),
                            {...action.storyD},
                            ...state.currentUser.stories.slice(idx + 1)]}
                }

            default: 
                return state
            
    }
}