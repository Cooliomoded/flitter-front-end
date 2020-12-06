import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

class GenreNavBar extends Component {

    render(){
        return(
            <div className="genre-filter">
                {/* <label htmlFor="genre-filter">Genre Filter</label>
                <select name="genre-filter" id="genre-filter">
                {this.props.genres.genres.map(genre => !this.state.genreFilter.includes(genre.genre) ? <option onChange={this.handleChange} value={genre.genre}>{genre.genre}</option> : null)}
                {this.props.genres.genres.map(genre =><option key={"filter" +genre.genre} onChange={this.handleChange} value={genre.genre}>{genre.genre}</option>)}
                </select> */}
                <div className="genre-selector">
                    <label htmlFor="genre-selector">Story Genre Selector</label>
                    <select onChange={this.props.handleAddGenreFilter} name="genre-selector" id="genre-selector">
                        <option>Genres</option>
                        {this.props.genres.genres.map(genre =>
                            !this.props.genreFilter.includes(genre.genre) ? <option key={"option" + genre.id} value={genre.genre}>{genre.genre}</option> : null)}
                    </select>
                </div>
                <div className='genre-selections'>
                    <p>Sorting by these Genres:</p>
                    {this.props.genreFilter.map(genre =>
                         <button key={"button-for-genre" + genre}onClick={this.props.handleRemoveGenreFilter} value={genre}>{genre}</button>
                    )}
                    {this.props.genreFilter.length > 0 ? <p>Click to remove genre from list of genres</p> : null }
                </div>
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