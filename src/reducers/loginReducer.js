const initialState = {
    currentUser: {}
}


export default function loginReducer(state = initialState, action) {
    let idx
    let story
    switch(action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.user
                
            }
        case 'ADD_TO_USER_STORIES':
            console.log('made it to login reducer')
            return {
                ...state,
                currentUser: {...state.currentUser,
                stories: [...state.currentUser.stories, action.storyD]
                },
                requesting: false
            }

        case 'UPDATE_USER_STORY':
            idx = state.currentUser.stories.findIndex(story => story.id === action.storyD.id)
            return {
                ...state,
                currentUser: {...state.currentUser,
                stories: [...state.currentUser.stories.slice(0, idx),
                {...action.storyD},
                ...state.currentUser.stories.slice(idx + 1)]},
                requesting: false
            }
        
        case 'GENRE_UPDATING':
            return {
                ...state,
                requesting: true
            } 
        case 'UPDATE_USER_STORY_GENRES':
            idx = state.currentUser.stories.findIndex(story => story.id === action.genre.story_id)
            story = state.currentUser.stories[idx]
            return {
                ...state,
                currentUser: {...state.currentUser,
                stories: [...state.currentUser.stories.slice(0, idx),
                {...story,
                genres: [...story.genres, action.genre]}]},
                requesting: false
            }
        default:
            return state
    }
}