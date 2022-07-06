import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";
import { getDataAPI } from "../utils/fetchData";
import UserCard from "./UserCard";
import LoadIcon from '../images/loading.gif'

const Search = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setSearch('')
    setUsers([])
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoading(true)
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users)
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.message } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='search_form' onSubmit={handleSearch}>
      <input title="Enter to search" type="text" name="search" value={search} onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />
      <div className='search_icon' style={{ opacity: search ? 0 : 0.3}}>
        <span className='material-icons'>search</span>
        <span>Search</span>
      </div>
      <div className="close_search" style={{ opacity: users.length === 0 ? 0 : 1 }} onClick={handleClose}>
        &times;
      </div>
      <button type="submit" className="d-none">Search</button>
      {loading && <img className="loading" src={LoadIcon} alt='loading' />}
      <div className="users">
        {
         search && users.map((user) => (
            <UserCard 
              key={user._id} 
              user={user} 
              border={'border'} 
              handleClose={handleClose} />
          ))
        }
      </div>
    </form>
  )
}

export default Search;