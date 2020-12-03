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

export const fetchStory = (story) => {
    return (dispatch) => {
        dispatch({type:"PRE_STORY_UPDATE"})
        fetch(`http://localhost:3000/stories/${story.id}`)
        .then(res => res.json())
        .then(data => {
            let storyD = data.story
            dispatch({type: 'STORY_UPDATE', storyD})
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
                let newStory = data.story
                story.genreIds.forEach(id =>
                    createStoryGenres(newStory.id, id)
                )
                dispatch({type: "ADD_STORY", newStory})
                fetchStory(newStory)
            })
        }
    }
}

export const createStoryGenres = (storyId, genreId) => {
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
            genre_id: genreId,
            story_id: storyId
        })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}

export const removeStoryGenres = (genreId) => {
    const token = localStorage.token
    if (token) {
        return (dispatch) => {
            dispatch({type: 'PRE_REMOVE_GENRE'})
            fetch(`http://localhost:3000/story_genres/${genreId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }
}

export const editStory = (story) => {
    const token = localStorage.token
    console.log('edit story action')
    return (dispatch) => {
        dispatch({type:'PRE_EDIT'})
        fetch(`http://localhost:3000/stories/${story.storyId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: story.title,
                content: story.text,
            })
        })
        .then(res => res.json())
        .then(data => {
            let storyD = data.story
            console.log(data)
            if (story.addedIds.length > 0) {
                story.addedIds.forEach(id =>
                    createStoryGenres(storyD.id, id)
                )
            }
            if (story.removedIds.length > 0) {
                story.removedIds.forEach(id =>
                    removeStoryGenres(id))
            }
            fetchStory(storyD)
        })
    }
}

export const likeStory = (story) => {
    const token = localStorage.token
    console.log(story)
    return (dispatch) => {
        dispatch({type:'PRE_LIKE'})
        fetch(`http://localhost:3000/stories/${story.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                story: {
                    likes: story.likes + 1
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let storyD = data.story
            dispatch({type:'LIKE_STORY', storyD})
        })
    }
}

export const readStory = (story) => {
    const token = localStorage.token
    console.log("started read")
    console.log(story.id)
    console.log(story.reads)
    console.log(story.reads + 1)
    return (dispatch) => {
        dispatch({type:'PRE_READ'})
        fetch(`http://localhost:3000/stories/${story.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                story: {
                    reads: story.reads + 1
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            let storyD = data.story 
            console.log(storyD)   
            dispatch({type:'READ_STORY', storyD})       
        })
    }
}

export const deleteStory = (story) => {
    const token = localStorage.token
    fetch(`http://localhost:3000/stories/${story.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}