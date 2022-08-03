import React from 'react'
import Avatar from '../Avatar'

const MsgDisplay = ({user}) => {
  return (
    <>
      <div className='chat_title'>
        <Avatar src={user.avatar} size='small-avatar' />
        <span>{user.username}</span>
      </div>
      <div className='chat_text'>
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <div className='chat_time'>
        April 2022
      </div>
    </>
  )
}

export default MsgDisplay