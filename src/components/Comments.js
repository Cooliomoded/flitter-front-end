import React, { Component } from 'react'
import { connect } from 'react-redux'

import StoryCard from './StoryCard'
import UserNavBar from './UserNavBar'
import Comment from './Comment'

class Comments extends Component {

    render(){
        return(
            <div>
                <div>
                    <UserNavBar></UserNavBar>
                </div>
                <div className='under-nav'>
                {this.props.userComments && this.props.userComments.length > 0
                ? this.props.userComments.map(comment =>
                <div>
                    <h3>Commented On:</h3>
                    <StoryCard story={this.props.stories.find(story => story.id === comment.story_id)}></StoryCard>
                    <h4>Comment:</h4>
                    <Comment comment={comment}></Comment>
                </div>)
                : <p>Help those writers out and make some comments!</p>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
    userComments: state.login.currentUser.comments,
    stories: state.story.stories
    }
}

export default connect(mapStateToProps)(Comments)