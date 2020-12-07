import React from 'react'

const StoryCard = ({ story }) => {
    return(
        <div className='story-card'>
            <h3>{story ? story.title : null}</h3>
            {story ? story.genres.map(genre => <li key={story.id + " " + genre.genre}>{genre.genre}</li>) : null}
            <h3>By: {story ? story.user.penname : null}</h3>
            <p>Reads: {story ? story.reads : null}, Likes: {story ? story.likes : null}</p>
        </div>
    )
}

export default StoryCard