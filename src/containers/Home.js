import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import UserNavBar from '../components/UserNavBar'
import GenreNavBar from '../components/GenreNavBar'
import StoryContainer from './StoryContainer'
import StoryShow from '../components/StoryShow'

import { editStory, deleteStory, fetchStories } from '../actions/storyActions'
import { fetchGenres } from '../actions/genreActions'
import { getProfileFetch } from '../actions/loginActions'



class Home extends Component {

    async componentDidMount() {
        await this.props
        await this.props.fetchStories()
        await this.props.fetchGenres()
        await this.props.getProfileFetch()
     
    }

    render() {
        return(
            <div className='home-page'>
                <UserNavBar />
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
        user: state.user,
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