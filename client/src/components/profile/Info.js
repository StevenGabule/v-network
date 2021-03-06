import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileUser } from '../../redux/actions/profileAction'
import Avatar from '../Avatar'
import FollowButton from '../FollowButton'
import EditProfile from './EditProfile'

const Info = () => {
  const { id } = useParams()
  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUser({users: profile.users, id, auth}))
      const newData = profile.users.filter((user) => user._id === id);
      console.log('newData', newData);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users])

  return (
    <div className='info'>
      {userData.map(user => (
        <div className='info_container' key={user._id}>
          <Avatar size={'supper-avatar'} src={user.avatar} />
          <div className='info_content'>
            <div className='info_content_title'>
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button className='btn btn-outline-info' onClick={() => setOnEdit(true)}>Edit Profile</button>
              ) : (
                <FollowButton user={user} />
              )}
            </div>
            <div className='follow_btn'>
              <span className='mr-4'>{user.followers.length} Followers</span>
              <span className='ml-4'>{user.following.length} Following</span>
            </div>
            
            <h6>{user.fullname} | {user.mobile}</h6>
            <p className='m-0'>{user.address}</p>
            <h6>{user.email}</h6>
            
            <a href={user.website} target='_blank' rel='noreferrer'>{user.website}</a>
            <p>{user.story}</p>
          </div>
          {/* Edit Profile */}
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
        </div>
      ))}
    </div>
  )
}

export default Info