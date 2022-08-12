import {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { GLOBAL_TYPES } from './redux/actions/globalTypes'
import { POST_TYPES } from './redux/actions/postAction'
import { NOTIFY_TYPES } from './redux/actions/notifyAction'
import audioBell from './audio/client_src_audio_got-it-done-613.mp3'
import { MESS_TYPES } from './redux/actions/messageAction'

const spawnNotification = (body, icon, url, title) => {
  let options = {body, icon}
  let n = new Notification(title, options)
  n.onclick = e => {
    e.preventDefault()
    window.open(url, '_blank')
  }
}

const SocketClient = () => {
  const {auth,socket,notify, online} = useSelector(state => state)
  const dispatch = useDispatch()

  const audioRef = useRef();

  useEffect(() => {
    socket.emit('joinUser', auth.user)
  }, [socket, auth.user])

  // likes
  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    })
    return () => socket.off('likeToClient')
  }, [socket, dispatch])
  
  useEffect(() => {
    socket.on('unLikeToClient', (newPost) => {
      dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    })
    return () => socket.off('unLikeToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('createCommentToClient', (newPost) => {
      dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    })
    return () => socket.off('createCommentToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost) => {
      dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    })
    return () => socket.off('deleteCommentToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('followToClient', (newUser) => {
      dispatch({type: GLOBAL_TYPES.AUTH, payload: {...auth, user: newUser}})
    })
    return () => socket.off('followToClient')
  }, [socket, dispatch, auth])

  useEffect(() => {
    socket.on('unFollowToClient', (newUser) => {
      dispatch({type: GLOBAL_TYPES.AUTH, payload: {...auth, user: newUser}})
    })
    return () => socket.off('unFollowToClient')
  }, [socket, dispatch, auth])

  useEffect(() => {
    socket.on('createNotifyToClient', (msg) => {
      dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})
      if(notify.sound) audioRef.current.play();
      spawnNotification(
        msg.user.username + ' ' + msg.text,
        msg.user.avatar,
        msg.url,
        'V-Network'
      )
    })
    return () => socket.off('createNotifyToClient')
  }, [socket, dispatch, notify.sound])

  useEffect(() => {
    socket.on('removeNotifyToClient', (msg) => {
      dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
    })
    return () => socket.off('removeNotifyToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})
      dispatch({
	    type: MESS_TYPES.ADD_USER, 
		payload: {
			...msg.user, 
			text: msg.text, 
			media: msg.media 
	  }})
    })
    return () => socket.off('addMessageToClient')
  }, [socket, dispatch])
  
  useEffect(() => {
	  socket.emit('checkUserOnline', auth.user)
  }, [socket, auth.user])
  
  // check user online/offline
  useEffect(() => {
	  socket.on('checkUserOnlineToMe', (data) => {
		  data.forEach((item) => {
			  if(!online.includes(item.id)) {
				  dispatch({type: GLOBAL_TYPES.ONLINE, payload: item.id})
			  }
		  })
	  })
	  
	  return () => socket.off('checkUserOnlineToMe')
  }, [socket, dispatch, online])

  
  useEffect(() => {
	  socket.on('checkUserOnlineToClient', (id) => {
		  console.log('id', id)
		if(!online.includes(id)) {
		  dispatch({type: GLOBAL_TYPES.ONLINE, payload: id})
		}
	  })
	  
	  return () => socket.off('checkUserOnlineToClient')
  }, [socket, dispatch, online])
  
  // check user offline
  useEffect(() => {
	  socket.on('CheckUserOffline', id => {
		  dispatch({ type: GLOBAL_TYPES.OFFLINE, payload: id })
	  })
	  return () => socket.off('CheckUserOffline')
  }, [socket, dispatch])

  return (
    <>
      <audio controls ref={audioRef} style={{display: 'none'}}>
        <source src={audioBell} type="audio/mp3"  />
      </audio>
    </>
  )
}

export default SocketClient