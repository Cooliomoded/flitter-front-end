import React from 'react'

const Support = () => {

    return(
        <div>
            Hello, this is support speaking.
            To recieve an email with relevant account information, enter and email.
            <form>
                <label htmlFor="email">Account Email Address:</label>
                <input type="text" id="email" name="email" placeholder="Enter email address associated with account"></input>
                <input type="submit" id="submit" name="submit">Recieve Email</input>
            </form>
        </div>
    )
}

export default Support