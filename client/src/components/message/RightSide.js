import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { addMessage, getMessages, loadMoreMessages, deleteConversation } from '../../redux/actions/messageAction'
import { imageUpload } from '../../utils/checkImage'
import { imageShow, videoShow } from '../../utils/mediaShow'
import Icons from '../Icons'
import UserCard from '../UserCard'
import MsgDisplay from './MsgDisplay'
import LoadIcon from '../../images/loading.gif'

const RightSide = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  
  const { auth, message, theme, socket } = useSelector((state) => state)
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)
  
  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    const newData = message.data.find(item => item._id === id)
    if(newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  },[id, message.data])

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];
    files.forEach((file) => {
      if (!file) return err = "File does not exist.";
      if (file.size > 1024 * 1024 * 5) {
        return err = "The image/video largest is 5mb.";
      }
      return newMedia.push(file)
    })
    if (err) dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err } })
    setMedia([...media, ...newMedia])
  }

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
      }, 50)
      const newUser = message.users.find((user) => user._id === id)
      if(newUser) setUser(newUser)
    }
  }, [message.users,id])

  const handleDeleteMedia = (idx) => {
    const newArr = [...media];
    newArr.splice(idx, 1)
    setMedia(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && media.length === 0) return;
    setText('')
    setMedia([])
    setLoadMedia(true)

    let newArr = []
    if (media.length > 0) newArr = await imageUpload(media)

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    }

    setLoadMedia(false)

    await dispatch(addMessage({msg, auth, socket}))

    if(refDisplay.current) {
      refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  }

  useEffect(() => {
    if(id) {
      const getMessagesData = async () => {
        if(message.data.every(item => item._id !== id)) {
          await dispatch(getMessages({auth,id}))
          setTimeout(() => {
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
          }, 50)
        }
      }
      getMessagesData();
    }
  }, [id, dispatch, auth, message.data])

   useEffect(() => {
     const observer = new IntersectionObserver(entries => {
       if(entries[0].isIntersecting) {
         setIsLoadMore(p => p+1)
       }
     }, {
       threshold: 0.1
     });
     observer.observe(pageEnd.current)
   }, [setIsLoadMore])
  
   useEffect(() => {
	   if(isLoadMore > 1) {
		if(result >= page * 9) {
		  dispatch(loadMoreMessages({auth, id, page: page + 1}))
		  setIsLoadMore(1)
		}   
	   }
	// eslint-disable-next-line
   }, [isLoadMore])

   const handleDeleteConversation = () => {
	   dispatch(deleteConversation({auth,id}))
	   return history.push('/message')
   }
   
  return (
    <>
      <div className='message_header' style={{ cursor: 'pointer' }}>
        {
          user.length !== 0 && (
            <UserCard user={user}>
              <i className='fas fa-trash text-danger' onClick={handleDeleteConversation} />
            </UserCard>
          )
        }
      </div>
      <div className='chat_container' style={{ height: media.length > 0 ? 'calc(100% - 180px)' : ''}}>
        <div className='chat_display' ref={refDisplay}>
          <button style={{marginTop: '-25px', opacity: 0}} ref={pageEnd}>Load more</button>
          {
            data.map((msg, idx) => (
              <div key={idx}>
                {
                  msg.sender !== auth.user._id && (
                    <div className='chat_row other_message'>
                      <MsgDisplay user={user} msg={msg} theme={theme} data={data} />
                    </div>
                  )
                }
                {
                  msg.sender === auth.user._id && (
                    <div className='chat_row you_message'>
                      <MsgDisplay user={auth.user} msg={msg} theme={theme} data={data} />
                    </div>
                  )
                }
              </div>
            ))
          }
          {loadMedia && (
            <div className='chat_row you_message'>
              <img src={LoadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>

      <div className='show_media' style={{display: media.length > 0 ? 'grid' : 'none'}}>
        {
          media.map((item, idx) => (
            <div key={idx} id={"file_media"}>
              {
                item.type.match(/video/i)
                ? videoShow(URL.createObjectURL(item), theme)
                : imageShow(URL.createObjectURL(item), theme)
              }
              <span onClick={() => handleDeleteMedia(idx)}>&times;</span>
            </div>
          ))
        }
      </div>

      <form className='chat_input' onSubmit={handleSubmit}>
        <input 
          type={'text'} 
          placeholder='Enter your message...' 
          value={text} 
          onChange={e => setText(e.target.value)} 
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            background: theme ? "#040404" : "",
            color: theme ? "white" : ""
          }}
          />

          <Icons setContent={setText} content={text} theme={theme} />

          <div className='file_upload'>
            <i className='fas fa-image text-danger' />
            <input 
              type={'file'} 
              name='file' 
              id='file' 
              multiple 
              accept='image/*,video/*' 
              onChange={handleChangeMedia} />
          </div>
        <button 
          disabled={(text || media.length > 0) ? false : true} 
          type='submit' 
          className='material-icons'>
            near_me
        </button>
      </form>
    </>
  )
}

export default RightSide