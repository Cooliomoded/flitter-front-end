import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import GenreNavBar from '../components/GenreNavBar'
import StoryShow from '../components/StoryShow'
import UserNavBar from '../components/UserNavBar'


class StoryContainer extends Component {

    state = {
        toggleReadStory: false,
        genreFilter: [],
        filteredStories: [],
        showGenreFilter: true
    }

    componentDidMount(){
        if(this.props.stories.stories.length > 0){
        this.setState({
            ...this.state,
            toggleReadStory: false,
            filteredStories: [...this.props.stories.stories]
        })}
    }

    handleOnClick = () => {
        this.setState({
            ...this.state,
            toggleReadStory: !this.state.toggleReadStory,
            showGenreFilter: !this.state.showGenreFilter
        })
    }

    handleCardDismount = () => {
        this.setState({
            ...this.state,
            toggleReadStory: false,
            showGenreFilter: true
        })
    }

    handleAddGenreFilter = (event) => {
        this.setState({
            ...this.state,
            genreFilter: [...this.state.genreFilter, event.target.value],
            filteredStories: [...this.state.filteredStories.filter(story => story.genres.some(genre => genre.genre === event.target.value))],
        })
        console.log(this.state)
    }

    handleRemoveGenreFilter = (event) => {
        let newFilter = [...this.state.genreFilter.filter(genre => genre !== event.target.value)]
        let allStories = [...this.props.stories.stories]
        newFilter.forEach(filter => allStories = allStories.filter(story => story.genres.some(genre => genre.genre === filter)))
        this.setState({
            ...this.state,
            filteredStories: [...allStories],
            genreFilter: [...newFilter]
        })
    }

    returnToIndex = () => {
        this.setState({
            ...this.state,
            toggleReadStory: false,
            showGenreFilter: true
        })
    }

    readingStory = () => {
        if(!this.state.toggleReadStory){
        this.setState({
            ...this.state,
            toggleReadStory: true,
            showGenreFilter: false
        })}
    }

    render(){
        const { filteredStories } = this.state
        const renderStories = Object.keys(filteredStories).map(storyId =>
        <div className="story-link" key={'story-link' + storyId}>
            <Link onClick={this.handleOnClick} to={`/index/${storyId}`}><StoryCard story={filteredStories[storyId]}></StoryCard></Link>
        </div>
        )

        return(
            <div>
                <div className='navbar-container user-navbar'>
                    <UserNavBar returnToIndex={this.returnToIndex} />
                </div>
                <div className='navbar-container genre-navbar'>
                    {this.state.showGenreFilter 
                    ? <GenreNavBar genreFilter={this.state.genreFilter} handleAddGenreFilter={this.handleAddGenreFilter} handleRemoveGenreFilter={this.handleRemoveGenreFilter}></GenreNavBar>
                    : null}
                </div>
                <div className='story-container'>
                    {this.props.match.url === '/index' && !this.state.toggleReadStory && renderStories}
                </div>
                <Route exact path={`${this.props.match.url}/:storyId`} render={routerProps =><StoryShow {...routerProps} readingStory={this.readingStory} handleCardDismount={this.handleCardDismount} stories={this.props.stories}/>}/>
            </div>
        )
    }   
}

export default connect()(StoryContainer)
