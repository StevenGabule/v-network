import {useEffect, useState, useRef} from 'react'
import UserCard from '../UserCard'
import {useSelector,useDispatch} from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { MESS_TYPES, getConversation } from '../../redux/actions/messageAction'

const LeftSide = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const {auth, message, online} = useSelector((state) => state)
  const {id} = useParams();
  
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])
  const pageEnd = useRef()
  const [page, setPage] = useState(0)

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token) 
      setSearchUsers(res.data.users)
    } catch (err) {
      dispatch({
        type: GLOBAL_TYPES.ALERT, payload: {error: err.response.data.msg}
      })
    }
  }

  const handleAddUser = (user) => {
    setSearch('')
    setSearchUsers([])
    dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: [] }})
    dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
    return history.push(`/message/${user._id}`)
  }

  const isActive = (user) => {
    if(id === user._id) return 'active';
    return ''
  }

  useEffect(() => {
    if(message.firstLoad) return;
    dispatch(getConversation({auth}))
  }, [dispatch, auth, message.firstLoad])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        setPage(p => p+1)
      }
    }, {
      threshold: 0.1
    });
    observer.observe(pageEnd.current)
  }, [setPage])
  
  useEffect(() => {
    if(message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversation({auth, page}))
    }
  }, [message.resultUsers, page, auth, dispatch])
  
  // check user online - offline
  useEffect(() => {
	  if(message.firstLoad) {
		  dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
	  }
  }, [online, message.firstLoad, dispatch])
  

  return (
    <>
      <form className='message_header' onSubmit={handleSearch}>
        <input
          onChange={e => setSearch(e.target.value)} 
          type={'text'} 
          value={search} 
          name="search"
          placeholder='Enter to search...' />
          <button type='submit' style={{display: 'none'}}>Search</button>
      </form>
      <div className='message_chat_list'>
        <div>
          {
            searchUsers.length !== 0 
            ? <>
              {
                searchUsers.map((user) => (
                  <div 
                    onClick={() => handleAddUser(user)}
                    key={user._id} 
                    className={`message_user ${isActive(user)}`}>
                    <UserCard user={user} />
                  </div>
                ))
              }
            </>
            : <>
                {
                  message.users.map((user) => (
                    <div onClick={() => handleAddUser(user)} key={user._id} className={`message_user ${isActive(user)}`}>
                      <UserCard user={user} msg={true}>
						  {
							  user.online
							  ? <i className='fas fa-circle text-success' />
							  : auth.user.following.find((item) =>
								item._id === user._id
							  ) && <i className='fas fa-circle' />
						  }
                      </UserCard>
                    </div>
                  ))
                }
              </>
          }
        </div>
        <button ref={pageEnd} style={{opacity: 0}}>Load more</button>
      </div>
    </>
  )
}

export default LeftSide