import {useState, useEffect} from 'react'
import PostThumb from '../PostThumb'

const Posts = ({ auth, profile, dispatch, id }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  
  useEffect(() => {
    profile.posts.forEach((data) => {
      if(data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
      }
    })
  },[profile.posts, id])

  return (
    <div>
      <PostThumb posts={posts} result={result} />
    </div>
  )
}

export default Posts