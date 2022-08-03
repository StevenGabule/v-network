import {useState} from 'react'
import UserCard from '../UserCard'
import {useSelector,useDispatch} from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { addUser } from '../../redux/actions/messageAction'

const LeftSide = () => {
  const {auth, message} = useSelector((state) => state)
  const dispatch = useDispatch();
  const history = useHistory()
  const {id} = useParams();
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

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
    dispatch(addUser({user, message}))
    return history.push(`/message/${user._id}`)
  }

  const isActive = (user) => {
    if(id === user._id) return 'active';
    return ''
  }

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
                    <div 
                      onClick={() => handleAddUser(user)}
                      key={user._id} 
                      className={`message_user ${isActive(user)}`}>
                      <UserCard user={user}>
                        <i className='fas fa-circle' />
                      </UserCard>
                    </div>
                  ))
                }
              </>
          }
        </div>
      </div>
    </>
  )
}

export default LeftSide