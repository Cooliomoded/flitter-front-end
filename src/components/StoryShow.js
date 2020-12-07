import jwtDecode from 'jwt-decode'
import React, { Component } from 'react'

import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import { connect } from 'react-redux'
import { likeStory, readStory } from '../actions/storyActions'
import { postComment } from '../actions/commentActions'

class StoryShow extends Component {

    state = {
        writeComment: false,
        text: ''
    }

    componentDidUpdate(){
        this.props.readingStory()
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

    leavingAComment  = () => {
        this.setState({
            ...this.state,
            writeComment: true
        })
    }

    handleTextOnChange = (content) => {
        this.setState({ 
            ...this.state,
            text: content
        })
    }

    submitComment = () => {
        let comment = {
            story_id: this.props.stories.stories[this.props.match.params.storyId].id,
            user_id: jwtDecode(localStorage.token).user_id,
            text: this.state.text,
        }
        console.log(comment)
        this.props.postComment(comment)
        this.setState({
            ...this.state,
            writeComment: false,
            text: ''
        })
    }

    render(){
        console.log(this.props)
        const { match, stories, handleCardDismount } = this.props
        console.log(stories.stories)
        console.log(match.params.storyId)
        const modules = {
            toolbar: [
              false
            ],
          }
        const writingModules = {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline','strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
          }
    
        const writingFormats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
          ]
    return(
        <div className="story-page">
            { stories.stories.length > 0 ?
            <div className="story-page-title-info">
                <h3>Title: { stories.stories[match.params.storyId].title }</h3>
                <h4>By: { stories.stories[match.params.storyId].user.penname }</h4>
                <h4>Genres:</h4>
                { stories.stories[match.params.storyId].genres.map(genre => <p key={genre.id}>{genre.genre}</p>) }
            </div>
            : null
            }
            { stories.stories.length > 0 ?
            <div className="story-page-content">
                <ReactQuill
                    readOnly={true}
                    value={ stories.stories[match.params.storyId].content}
                    modules={modules}
                >
                </ReactQuill>
            </div>
            : null }  
            {stories.stories.length > 0 ?
            <div>
                <button className='read-button' onClick={this.handleRead}>Done Reading</button>
                <h4>Reads: { stories.stories[match.params.storyId].reads}</h4>
                <button className='like-button' onClick={this.handleLike}>Like Story</button>
                <h4>Likes: {stories.stories[match.params.storyId].likes}</h4>
            </div>
            : null }
                {stories.stories.length > 0 ?
                <div className='quill-container'>
                    {!this.state.writeComment ?
                    <button onClick={this.leavingAComment}>Leave a Comment</button>
                    : null }
                    {this.state.writeComment ?
                    <div className="quill-surface">
                        <ReactQuill
                        value={this.state.text}
                        onChange={this.handleTextOnChange}
                        theme='snow'
                        modules={writingModules}
                        formates={writingFormats}
                        placeholder="Keep your Comment concise and actionable."
                        >
                        </ReactQuill>
                        <button onClick={this.submitComment}>Submit Comment</button>
                    </div>
                    : null
                    }
                </div>
                : null }
            {stories.stories.length > 0 ?
            <div className="story-page-comments">
                <h4>Comments:</h4>
                {stories.stories[match.params.storyId].comments.map(comment => 
                    <Comment key={comment.id} comment={comment}></Comment>)}
            </div>
            : null }
            {stories.stories.length > 0 ?
            <div>
                <Link to='/index' onClick={handleCardDismount}> Return to Index </Link>
            </div>
            : null }
        </div>
    )
    }
}

export default connect(null, { readStory, likeStory, postComment }) (StoryShow)