import React, { useState } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Loader from 'react-loader-spinner';

const initialState = {
    username: '',
    password: '',
}

const Login = (props) => {
    const [credentials, setCredentials] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    // Helpers`````````````
    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setIsLoading(true)
        axiosWithAuth()
        .post('/api/login', credentials)
        .then( res =>{
            // console.log(res)
            window.localStorage.setItem('token', res.data.payload)
             //navigate the user to /protected route (whatever landing page)
            props.history.push('/protected')
        })
        .catch( err => {
           console.log(err)
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
            />

            <input
                type='password'
                name='password'
                value={credentials.password}
                onChange={handleChange}
                placeholder='password'
            />

            {isLoading && <Loader type="Hearts" color="pink" height={80} width={80} />}
            <button>Log in</button>

        </form>
    )
}

export default Login

//Done for now