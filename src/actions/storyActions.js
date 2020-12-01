
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
        const token = localStorage.token
        if (token) {
            fetch('http://localhost:3000/stories', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: story.title,
                    content: story.text,
                    reads: 0,
                    likes: 0,
                })
            })
            .then(res => res.json())
            .then(data => {
                let newStory = data
                story.genreIds.forEach(id =>
                    createStoryGenres(newStory.story.id, id)
                )
                dispatch({type: "ADD_STORY", newStory})
            })
        }
    }
}

export const createStoryGenres = (story, genre) => {
    const token = localStorage.token
    if (token) {
    fetch('http://localhost:3000/story_genres', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        genre_id: genre,
        story_id: story
    })
    })
    .then(res => res.json())
    .then(data => console.log(data))
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