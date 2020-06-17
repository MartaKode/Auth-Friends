import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialFriend = {
    name: '',
    age: '',
    email: ''
}

const AddFriend = props => {
    const [newFriend, setNewFriend] = useState(initialFriend)

    // Helpers```````````
    const handleChange = e => {
        setNewFriend({ ...newFriend, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axiosWithAuth()
            .post('/api/friends', newFriend)
            .then(res => {
                console.log(res)
                props.setFriends(res.data)
            })
            .catch(err =>{
                console.log(err)
            })

            setNewFriend(initialFriend)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new friend:</h2>
            <div>
                <input
                    type='text'
                    name='name'
                    value={newFriend.name}
                    onChange={handleChange}
                    placeholder='name'
                    required //No more empty strings 
                />
            </div>

            <div>
                <input
                    type='text'
                    name='age'
                    value={newFriend.age}
                    onChange={handleChange}
                    placeholder='age'
                    required
                />
            </div>

            <div>
                <input
                    type='email'
                    name='email'
                    value={newFriend.email}
                    onChange={handleChange}
                    placeholder='email'
                    required
                />
            </div>

            <button>Add friend</button>

        </form>
    )
}

export default AddFriend