export const postComment = (comment) => {
    return(dispatch) => {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: comment.content,
                user_id: comment.user_id,
                story_id: comment.story_id
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}