import React from 'react'
import isValidToken from '../util/validateToken'

const PrivateRoute = () => {
    const isValid = isValidToken();

    return (
        <>
            {isValid ? <h1>Private Route</h1> : <h1>Not Logged In</h1>}
        </>
    )

}

export default PrivateRoute