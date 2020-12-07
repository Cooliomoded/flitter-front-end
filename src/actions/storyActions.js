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
    return (dispatch) => {
        console.log('made it into return')
        dispatch({type:"PRE_UPDATE_STORY"})
        fetch(`http://localhost:3000/stories/${story.id}`)
        .then(res => res.json())
        .then(data => {
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
                story.genreIds.map(id =>
                    createStoryGenres(newStory.id, id)
                )
                fetchStory(newStory)
            })
        }
    }
}

export const createStoryGenres = (storyId, genreId) => {
    const token = localStorage.token
    console.log('made it to create Story Genre')
    return (dispatch) => {
        if (token) {
            dispatch({type:"PRE_ADD_GENRE"})
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
            .then(data => {
                let genre = { genre: data.genre }
                genre.storyId = storyId
                console.log(genre)
                (dispatch({type: "POST_ADD_GENRE", genre}))
            })
        }
    }
}

export const removeStoryGenres = (storyId, genreId) => {
    const token = localStorage.token
    if (token) {
        console.log('made it to remove genre')
        return (dispatch) => {
            dispatch({type: 'PRE_REMOVE_GENRE'})
            fetch(`http://localhost:3000/remove_genre/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    story_id: storyId,
                    genre_id: genreId
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('made it back from remove genre')
                let story = { storyId: storyId }
                story.genreId = genreId
                dispatch({type: 'POST_REMOVE_GENRE', story})
            })
        }
    }
}

export const editStory = (story) => {
    const token = localStorage.token
    console.log('edit story action')
    console.log(story)
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