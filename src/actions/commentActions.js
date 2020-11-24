export const postComment = (comment) => {
    return(dispatch) => {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            }
        })
    }
}