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
                stories: [...state.stories, action.newStory]
            }

        case "UPVOTE_STORY":
            idx = state.findIndex(story => story.id === action.storyId)
            story = state[idx]
            return [
                ...state.slice(0, idx),
                {...story, votes: story.votes+1},
                ...state.slice(idx + 1)
            ]

        default:
            return state
    }

}