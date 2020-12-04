export const postComment = (comment) => {
    const token = localStorage.token
    return(dispatch) => {
        dispatch({type:'POSTING_COMMENT'})
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                comment: {
                    content: comment.text,
                    user_id: comment.user_id,
                    story_id: comment.story_id
                }
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}