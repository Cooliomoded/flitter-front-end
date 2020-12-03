import jwtDecode from 'jwt-decode'
import React, { Component } from 'react'

import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import { connect } from 'react-redux'
import { likeStory, readStory } from '../actions/storyActions'


class StoryShow extends Component {

    async componentDidMount(){
        await this.props.match
        await this.props.stories
        await this.props.handleCardDismount
    }

    handleLike = () => {
        let likeButton = document.querySelector(".like-button")
        likeButton.remove()
        this.props.likeStory(this.props.stories.stories[this.props.match.params.storyId])
    }

    handleRead = () => {
        let readButton = document.querySelector(".read-button")
        readButton.remove()
        console.log(this.props.stories.stories[this.props.match.params.storyId])
        this.props.readStory(this.props.stories.stories[this.props.match.params.storyId])
    }

    render(){
        const { match, stories, handleCardDismount } = this.props
        const modules = {
            toolbar: [
              false
            ],
          }
    return(
        <div className="story-page">
            <div className="story-page-title-info">
                <h3>Title: { stories.stories[match.params.storyId].title }</h3>
                <h4>By: { stories.stories[match.params.storyId].user.penname }</h4>
                <h4>Genres:</h4>
                { stories.stories[match.params.storyId].genres.map(genre => <p key={genre.id}>{genre.genre}</p>) }
            </div>
            <div className="story-page-content">
                <ReactQuill
                    readOnly='true'
                    value={ stories.stories[match.params.storyId].content}
                    modules={modules}
                >
                </ReactQuill>
            </div>
            <div>
                <button className='read-button' onClick={this.handleRead}>Done Reading</button>
                <h4>Reads: { stories.stories[match.params.storyId].reads}</h4>
                <button className='like-button' onClick={this.handleLike}>Like Story</button>
                <h4>Likes: {stories.stories[match.params.storyId].likes}</h4>
            </div>
            <div className="story-page-comments">
                <h4>Comments:</h4>
                {stories.stories[match.params.storyId].comments.map(comment => comment.user_id === jwtDecode(localStorage.token).user_id
                ? <Comment key={comment.id} comment={comment}></Comment>
                : <p key={comment.id}>{comment.content}</p>)}
            </div>
            <div>
                <Link to='/index' onClick={handleCardDismount}> Return to Index </Link>
            </div>
        </div>
    )
    }
}

export default connect(null, { readStory, likeStory }) (StoryShow)