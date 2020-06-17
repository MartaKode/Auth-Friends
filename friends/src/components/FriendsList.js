import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import AddFriend from './AddFriend'

const FriendsList = props => {
    const [friends, setFriends] = useState([])


    useEffect(() => {
        // const getFriends = () =>{
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                // console.log(res)
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        // }
    }, [])

    //Helpers`````````
    const deleteFriend = friendId =>{

        axiosWithAuth()
        .delete(`/api/friends/${friendId}`)
        .then( res=>{
            // console.log(res)
            setFriends(res.data)
        })
        .catch(err =>{
            console.log(err)
        })

    }

    

    return (
        <div>
        <AddFriend friends={friends} setFriends={setFriends}/>

<div className='friendMap'>
            {friends.map(friend => {
                return (
                    <div className='friendCard' key={friend.id}>
                        <div>name : {friend.name}</div>
                        <div>age : {friend.age}</div>
                        <div>email : {friend.email}</div>

                        <button onClick={()=>{deleteFriend(friend.id)}}>
                            Delete friend
                            </button>
                    </div>
                )
            })}
</div>


        </div>
    )
}

export default FriendsList