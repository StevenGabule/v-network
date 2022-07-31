import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction';
import LoadIcon from '../images/loading.gif';
import PostThumb from '../components/PostThumb'
import {getDataAPI} from '../utils/fetchData'
import LoadMoreBtn from '../components/LoadMoreBtn'

const Discover = () => {
  const {auth, discover} = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token))
    }
  }, [dispatch, auth.token, discover.firstLoad])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`post_discover?limit=${discover.page*9}`, auth.token)
    dispatch({type:DISCOVER_TYPES.UPDATE_POST,payload: res.data})
    setLoad(false)
  }

  return (
    <div>
      {
        discover.loading
        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
        : <PostThumb posts={discover.posts} result={discover.result} />
      }
      {
        load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
      }
      {
        !discover.loading && 
        <LoadMoreBtn 
          result={discover.result} 
          page={discover.page} 
          load={load} 
          handleLoadMore={handleLoadMore} /> 
      }
    </div>
  )
}

export default Discover;