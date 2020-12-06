import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import UserNavBar from '../components/UserNavBar'
import StoryContainer from './StoryContainer'

import { editStory, deleteStory, fetchStories } from '../actions/storyActions'
import { fetchGenres } from '../actions/genreActions'
import { getProfileFetch } from '../actions/loginActions'



class Home extends Component {

    render() {
        console.log(this.props)
        return(
            <div className='home-page'>
                    <div className='story-container'>
                        <StoryContainer {...this.props}></StoryContainer>
                        {/* <Route path={`${this.props.match.url}/:storyId`} render={routerProps =><StoryShow {...routerProps} stories={this.props.stories}/>}/> */}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.login,
        stories: state.story,
        genres: state.genre
    }
}

const mapDispatchToProps = dispatch => ({
    editStory: (story) => dispatch(editStory(story)),
    deleteStory: (story) => dispatch(deleteStory(story)),
    fetchStories: () => dispatch(fetchStories()),
    fetchGenres: () => dispatch(fetchGenres()),
    getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect (mapStateToProps, mapDispatchToProps)(Home)