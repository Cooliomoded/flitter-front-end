const initialState = {
    stories: [],
    requesting: false
}

export default function storyReducer(state = initialState, action) {
    let idx
    let story
    let genreIdx
    switch(action.type) {
        case "REQUEST_STORIES":
            console.log('made it to request stories')
            return {
                ...state,
                requesting: true
            }

        case "GET_STORIES":
            console.log('made it to get stories')
            return {
                stories: action.stories,
                requesting: false
            }
        
        case "ADD_STORY":
            console.log('made it to add story')
            return {
                ...state,
             requesting: true
            }

        case "PRE_UPDATE_STORY":
            console.log('made it to pre update')
            return {
                ...state,
                requesting: true
            }

        case "UPDATE_STORY":
            console.log('made it to update story')
            idx = state.stories.findIndex(story => story.id === action.storyD.id)
            return {
                ...state,
                stories: [...state.stories.slice(0, idx),
                {...action.storyD},
                ...state.stories.slice(idx + 1)],
                requesting: false
            }

        case "PRE_LIKE":
            console.log('made it to pre like')
            return {
                ...state,
                requesting: true
            }

        case "LIKE_STORY":
            console.log('made it to post like')
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
            console.log('made it to pre read')
            return {
                ...state,
                requesting: true
            }
        
        case "READ_STORY":
            console.log('made it to read story')
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
                requesting: true
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
        
        case "PRE_ADD_GENRE":
            idx = state.stories.findIndex(story => story.id === action.story_id)
            story = state.stories[idx]
            console.log('made it to pre add genre')
            return {
                ...state,
                requesting: true
            }

        case "POST_ADD_GENRE":
            console.log('made it to post add genre')

            return {
                ...state,
                requesting: false
            }

        case "PRE_REMOVE_GENRE":
            console.log('made it to pre remove genre')
            return {
                ...state,
                requesting: true
            }

        case "POST_REMOVE_GENRE":
            idx = state.stories.findIndex(story => story.id === action.storyId)
            story = state.stories[idx]
            genreIdx = story.genres.findIndex(genre => genre.id === action.genreId)
            console.log(action)
            console.log('made it to post remove genre')
            return {
                ...state,
                stories:
                    [...state.stories.slice(0, idx),
                    {...story, genres: [...story.genres.slice(0, genreIdx),
                    ...story.genres.slice(genreIdx+1)]},
                    ...state.stories.slice(idx + 1)],
                requesting: false
            }
        
        case "POSTING_COMMENT":
            console.log('made it to posting comment')
            return {
                ...state,
                requesting: true
            }

        case "POSTED_COMMENT":
            console.log('made it to posted comment')
            idx = state.stories.findIndex(story => story.id === action.commentD.story_id)
            story = state.stories[idx]
            return {
                stories: [...state.stories.slice(0, idx),
                    {...story, comments: [...story.comments, action.commentD]},
                    ...state.stories.slice(idx + 1)],
            }
        
        default:
            return state
    }

}