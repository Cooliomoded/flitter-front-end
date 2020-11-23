export const createUser = (user) => {
    const { username, penname, email, bio, profile_pic, password, password_confirmation } = user
    return (dispatch) => {
        fetch('http://localhost:3000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                penname: penname,
                email: email,
                bio: bio,
                profile_pic: profile_pic,
                password: password,
                password_confirmation: password_confirmation
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}