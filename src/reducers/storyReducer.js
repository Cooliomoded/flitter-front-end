const initialState = {
    stories: [],
    requesting: false
}

export default function storyReducer(state = initialState, action) {
    let idx
    let story
    switch(action.type) {
        case "REQUEST_STORIES":
            return {
                ...state,
                requesting: true
            }

        case "GET_STORIES":
            return {
                stories: action.stories,
                requesting: false
            }
        
        case "ADD_STORY":
            return {
                ...state,
                stories: [
                    ...state.stories,
                    action.newStory
                ]
            }

        case "PRE_UPDATE_STORY":
            return {
                ...state,
                requesting: true
            }

        case "UPDATE_STORY":
            idx = state.stories.findIndex(story => story.id === action.storyD.id)
            return {
                ...state,
                stories: [...state.stories.slice(0, idx),
                {...action.storyD},
                ...state.stories.slice(idx + 1)],
                requesting: false
            }

        case "PRE_LIKE":
            return {
                ...state,
                requesting: true
            }

        case "LIKE_STORY":
            idx = state.stories.findIndex(story => story.id === action.storyD.id)
            story = state.stories[idx]
            console.log(action.storyD)
            console.log('hit like')
            return {
                ...state,
                stories: [...state.stories.slice(0, idx),
                {...story, likes: story.likes+1},
                ...state.stories.slice(idx + 1)],
                requesting: false
            }
        
        case "PRE_READ":
            return {
                ...state,
                requesting: true
            }
        
        case "READ_STORY":
            idx = state.stories.findIndex(story => story.id === action.storyD.id)
            story = state.stories[idx]
            console.log(action.storyD)
            return {
                ...state,
                stories: [...state.stories.slice(0, idx),
                {...story, reads: story.reads+1},
                ...state.stories.slice(idx + 1)],
                requesting: false
            }
        case "PRE_EDIT":
            console.log('made it to pre edit')
            return {
                ...state,
                requesting: false
            }
        
        case "EDIT_STORY":
            idx = state.stories.findIndex(story => story.id === action.storyD.id)
            console.log(action.storyD)
            console.log('made it to edit')
            return {
                ...state,
                stories: [...state.stories.slice(0, idx),
                {...action.storyD},
                ...state.stories.slice(idx + 1)],
                requesting: false
            }
            
        default:
            return state
    }

}