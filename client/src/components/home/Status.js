import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'

const Status = () => {
  const {auth} = useSelector((state) => state)
  const dispatch = useDispatch();

  return (
    <div className='status my-3 d-flex'>
      <Avatar src={auth.user.avatar} size="big-avatar" />
      <button 
        className='statusBtn flex-fill'
        onClick={() => dispatch({type: GLOBAL_TYPES.STATUS, payload: true})}
        >
        {auth.user.username}, What are you thinking?
      </button>
    </div>
  )
}

export default Status