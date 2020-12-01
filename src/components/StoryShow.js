import React, { Component } from 'react'


class StoryShow extends Component {

    componentWillUnmount(){
    }

    render(){
    const { match, stories } = this.props
    return(
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
            <div className="story-page-comments">
                {stories.stories[match.params.storyId].comments.map(comment => <p key={comment.id}>{comment.content}</p>)}
            </div>
        </div>
    )
    }
}

export default StoryShow