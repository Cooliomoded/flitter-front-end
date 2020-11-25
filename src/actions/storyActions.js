
export const fetchStories = () => {
    return (dispatch) => {
        dispatch({type: 'REQUEST_STORIES'})
        fetch('http://localhost:3000/stories')
            .then(res => res.json())
            .then(data => {
        let stories = data
        dispatch({type: 'GET_STORIES', stories})
    })
    }
}

export const createStory = (story) => {
    return(dispatch) => {
    fetch('http://localhost:3000/stories/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: story.title,
            content: story.content,
            reads: 0,
            likes: 0,
            user_id: story.user_id
        })
    })
    .then(res => res.json())
    .then(data => {
        let story = data
        dispatch({type: 'ADD_STORY', story})
    })
    }
}

export const editStory = (story) => {
    fetch(`http://localhost:3000/stories/${story.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            title: story.title,
            content: story.content,
            reads: story.reads,
            likes: story.likes
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

export const likeStory = (story) => {
    fetch(`http://localhost:3000/stories/${story.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            likes: story.likes
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

export const deleteStory = (story) => {
    fetch(`http://localhost:3000/stories/${story.id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log(data))
}