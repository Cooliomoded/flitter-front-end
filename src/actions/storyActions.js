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
        fetch(`http://localhost:3000/stories/${story.id}`)
        .then(res => res.json())
        .then(data => {
            let storyD = data.story
            console.log(storyD)
            return (dispatch) => {
                dispatch({type: "ADDED_STORY", storyD})
                dispatch({type: "ADD_TO_USER_STORIES", storyD})
            }
        })
}

export const createStory = (story) => {
    return(dispatch) => {
        const token = localStorage.token
        dispatch({type:"ADD_STORY"})
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
                console.log(story.genreIds)
                let newStory = data.story
                story.genreIds.forEach(id =>
                    createStoryGenres(newStory.id, id)
                )
                console.log('doesnt end there')
                console.log(newStory)
                dispatch({type: 'ADD_TO_USER_STORIES', newStory})
            })
        }
    }
}

export const createStoryGenres = (storyId, genreId) => {
    const token = localStorage.token
    console.log(genreId, storyId)
    return (dispatch) => {
        dispatch({type:'ADD_STORY'})
        if (token) {
            fetch('http://localhost:3000/story_genres', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                genre: {
                    genre_id: genreId,
                    story_id: storyId
                }
            })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let genre = data.genre
                dispatch({type: 'UPDATE_USER_STORY_GENRES', genre})
                dispatch({type: 'ADDED_STORY'})
            })
        }
    }
}

export const removeStoryGenres = (storyId, genreId) => {
    const token = localStorage.token
    if (token) {
        console.log('made it to remove genre')
        fetch(`http://localhost:3000/remove_genre/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                genre: {
                    story_id: storyId,
                    genre_id: genreId
                }
            })
        }).then(res => res.json()).then(data => console.log(data.message))
    }
}

export const editStory = (story) => {
    const token = localStorage.token
    return (dispatch) => {
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
            debugger
            let storyD = data.story
            if(story.addedIds.length > 0) {
            console.log(story.addedIds)
            story.genreIds.forEach(id =>
                dispatch(createStoryGenres(story.storyId, id))
            )}
            if(story.removedIds.length > 0) {
                console.log(story.removedIds)
                story.removedIds.forEach(id => 
                dispatch(removeStoryGenres(story.storyId, id)))
            }
            console.log('made it past genres')
            dispatch(fetchEditedStory(storyD))
        })
    }
}

export const fetchEditedStory = (story) => {
    console.log('made it to fetch story')
    console.log(story.id)
    return (dispatch) => {
        fetch(`http://localhost:3000/stories/${story.id}`)
        .then(res => res.json())
        .then(data => {
            let storyD = data.story
            console.log(storyD)
            dispatch({type: 'UPDATE_STORY', storyD})
            dispatch({type: 'UPDATE_USER_STORY', storyD})
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