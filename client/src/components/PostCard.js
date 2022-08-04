import React from 'react'
import Comments from './home/Comments'
import InputComment from './home/InputComment'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/post_card/CardFooter'
import CardHeader from './home/post_card/CardHeader'

const PostCard = ({ post, theme }) => {
  return (
    <div className="card my-3" style={{
      filter: theme? "invert(1)" : "invert(0)",
      color: theme ? "white" : "#111"
    }}>
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  )
}

export default PostCard 