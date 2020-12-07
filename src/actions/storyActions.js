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
    console.log('made it to fetch story')
    console.log(story.id)
    return (dispatch) => {
        fetch(`http://localhost:3000/stories/${story.id}`)
        .then(res => res.json())
        .then(data => {
            debugger
            let storyD = data.story
            console.log(storyD)
            dispatch({type: 'UPDATE_STORY', storyD})
        })
    }
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
                fetchStory(newStory)
            })
        }
    }
}

export const createStoryGenres = (storyId, genreId) => {
    const token = localStorage.token
    console.log(genreId, storyId)
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
            .then(data => console.log(data))
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
        })
    }
}

export const editStory = (story) => {
    const token = localStorage.token
    console.log('edit story action')
    console.log(story)
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
            console.log(data)
            let storyD = data.story
            if(story.addedIds.length > 0) {
            story.genreIds.forEach(id =>
                createStoryGenres(story.storyId, id)
            )}
            if(story.removedIds.lenght > 0) {
                story.removedIds.forEach(id => 
                    removeStoryGenres(story.storyId, id))
            }
            dispatch({type: "EDIT_STORY", storyD})
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