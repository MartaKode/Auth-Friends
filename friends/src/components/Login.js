import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Loader from 'react-loader-spinner';

const initialState = {
    username: '',
    password: '',
}

const Login = (props) => {
    const [credentials, setCredentials] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    // Helpers`````````````
    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setIsLoading(true)
        axiosWithAuth()
            .post('/api/login', credentials)
            .then(res => {
                // console.log(res)
                window.localStorage.setItem('token', res.data.payload)
                //navigate the user to /protected route (whatever landing page)
                props.history.push('/protected')
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='username'
                value={credentials.username}
                onChange={handleChange}
                placeholder='username'
                required
            />

            <input
                type='password'
                name='password'
                value={credentials.password}
                onChange={handleChange}
                placeholder='password'
                required
            />

            {isLoading && <Loader type="Hearts" color="pink" height={80} width={80} />}
            {error === 'Request failed with status code 403' ?  <p>Is your username/password correct?</p> : <div className='error'>{error}</div>}
            <button>Log in</button>

        </form>
    )
}

export default Login

//Done for now