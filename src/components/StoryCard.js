import React from 'react'

const StoryCard = ({ story }) => {

    return(
        <div>
            <h3>{story.title}</h3>
            {story.genres.map(genre => <li key={"story-genres" + genre.id}>{genre.genre}</li>)}
            <h3>By: {story.user.penname}</h3>
            <p>Reads: {story.reads}, Likes: {story.likes}</p>
        </div>
    )
}

export default StoryCard