import React, { Component } from 'react'
import { connect } from 'react-redux'


import { createStory, createStoryGenres } from '../actions/storyActions'
import NavBar from './UserNavBar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class StoryWrite extends Component {

    state = {
        title: '',
        text: '',
        genres: [],
        genreIds: []
        // penname: ''
    }

    // componentDidMount(){
    //     this.setState({
    //         ...this.state,
    //         penname: this.props.user.currentUser.penname
    //     })
    // }

    handleTitleOnChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    handleTextOnChange = (content) => {
        this.setState({ 
            ...this.state,
            text: content
        })
        console.log(this.state)
    }

    addGenre = (event) => {
        let genreId = this.props.genres.genres.find(genre => genre.genre === event.target.value)
        this.setState({
            ...this.state,
            genres: [...this.state.genres, event.target.value],
            genreIds: [...this.state.genreIds, genreId.id]
        })
        console.log(this.state)
    }

    removeGenre = (event) => {
        let genreId = this.props.genres.genres.find(genre => genre.genre === event.target.value)
        console.log(genreId)
        this.setState({
            ...this.state,
            genres: [...this.state.genres.filter(name => name !== genreId.genre)],
            genreIds: [...this.state.genreIds.filter(genre => genre !== genreId.id)]
        })
        // console.log(this.state)
    }

    modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }

      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

    submitStory = () => {
        console.log(this.state)
        let story = this.state
        this.props.createStory(story)
    }

    render() {
        console.log(this.props)
    return(
        <div className='quill-container'>
            <NavBar></NavBar>
            <div className='quill-title'>
                <input onChange={this.handleTitleOnChange} type='text' name='title' value={this.state.title} placeholder='Title your Story'></input>
            </div>
            <div className='quill-surface'>
            <ReactQuill
                value={this.state.text}
                onChange={this.handleTextOnChange}
                theme='snow'
                modules={this.modules}
                formats={this.formats}
                placeholder="Make these words the best they can be."
            >
            </ReactQuill>
            </div>
            <div>
            <div className="genre-selector">
                <label htmlFor="genre-selector">Story Genre Selector</label>
                <select onChange={this.addGenre} name="genre-selector" id="genre-selector">
                    <option>Select at least one Genre</option>
                    {this.props.genres.genres.map(genre =>
                        !this.state.genres.includes(genre.genre) ? <option key={genre.id} value={genre.genre}>{genre.genre}</option> : null)}
                </select>
            </div>
                <div className='genre-selections'>
                    <p>Story Genres:</p>
                    {this.state.genres.map(genre =>
                         <button onClick={this.removeGenre} value={genre}>{genre}</button>
                    )}
                    {this.state.genres.length > 0 ? <p>Click to remove genre from list of genres</p> : null }
                </div>
            </div>
            <div>
                {this.state.title.length > 6 ?
                (this.state.text.length > 20 ?
                (this.state.genres.length > 0 ?
                <button onClick={this.submitStory}>Submit Story</button>
                : null)
                : null)
                : null}
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return{
    user: state.login,
    genres: state.genre
    }
}


export default connect(mapStateToProps, {createStory} )(StoryWrite) 