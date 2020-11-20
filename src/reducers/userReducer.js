export default function userReducer(
    state = {
        stories: []
    },
    action
) 
{
    console.log(action)
    switch (action.type) {
            case 'UPVOTE':
                console.log('upvoted')
            return {
                ...state, upvotes: state.stories.upvotes + 1
            }
            default: 
                return state
    }
}