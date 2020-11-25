export const createUser = (user) => {
    
    const { username, penname, email, bio, profile_pic, password } = user
    
    return (dispatch) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: username,
                penname: penname,
                email: email,
                bio: bio,
                picture: profile_pic,
                password: password,
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            let user = data.user
            dispatch({type: 'LOGIN_USER', user})
            localStorage.removeItem('token')
            localStorage.setItem('token', data.token)
        })
    }
}