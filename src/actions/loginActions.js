export const fetchLogin = (formData) => {
    return (dispatch) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        })
        .then(res => res.json())
        .then(data => {
            let user = data.user
            localStorage.setItem('token', data.token)
            dispatch({ type: 'LOGIN_USER', user })
        })
    }
}

export const getProfileFetch = () => {
    return (dispatch) => {
        const token = localStorage.token
        if (token) {
            return fetch('http://localhost:3000/initialFetch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
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