import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

class GenreNavBar extends Component {

    state = {
        genreFilter: [],
    }

    handleChange = (event) => {
        console.log(event)
    }

    render(){
        return(
            <div className="genre-filter">
                <label htmlFor="genre-filter">Genre Filter</label>
                <select name="genre-filter" id="genre-filter">
                {/* {this.props.genres.genres.map(genre => !this.state.genreFilter.includes(genre.genre) ? <option onChange={this.handleChange} value={genre.genre}>{genre.genre}</option> : null)} */}
                {this.props.genres.genres.map(genre =><option key={genre.id} onChange={this.handleChange} value={genre.genre}>{genre.genre}</option>)}
                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genre
    }
}

export default connect (mapStateToProps)(GenreNavBar)