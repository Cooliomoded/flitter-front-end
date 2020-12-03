import jwt_decode from 'jwt-decode'

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

export const editUser = (user) => {
    const { username, penname, email, bio, profile_pic} = user
    return (dispatch) => {
        const token = localStorage.token
        var decoded = jwt_decode(token);
        console.log(decoded.user_id)
        if (token) {
            return fetch(`http://localhost:3000/users/${decoded.user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        penname: penname,
                        email: email,
                        bio: bio,
                        picture: profile_pic ? profile_pic : ''
                    }
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    localStorage.removeItem('token')
                } else {
                    let user = data.user
                    dispatch({ type: 'LOGIN_USER', user})
                }
            })
        }
    }
}