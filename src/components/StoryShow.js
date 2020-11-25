import React from 'react'

const StoryShow = ( {match, stories} ) => {
    console.log(stories)

    return(
        // <div>
        // {console.log(match, stories)}
        // </div>
        <div className="story-page">
            <div className="story-page-title-info">
                <h3>{ stories.stories[match.params.storyId].title }</h3>
                <h4>{ stories.stories[match.params.storyId].user.penname }</h4>
                { stories.stories[match.params.storyId].genres.map(genre => <p key={genre.id}>{genre.genre}</p>) }
                <h4>Reads: { stories.stories[match.params.storyId].reads} with {stories.stories[match.params.storyId].likes} Likes</h4>
            </div>
            <div className="story-page-content">
                <p>{ stories.stories[match.params.storyId].content }</p>
            </div>
        </div>
    )
}

export default StoryShow