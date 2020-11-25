export const fetchGenres = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/genres')
        .then(res => res.json())
        .then(data => {
            let genres = data
            dispatch({type: 'GET_GENRES', genres})
        })
    }
}