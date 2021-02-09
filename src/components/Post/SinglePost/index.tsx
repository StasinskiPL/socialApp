import React from 'react'
import { Card } from 'react-bootstrap'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'


const SinglePost:React.FC<Post> = ({id,authorId,date,comments,likes,text,userNick}) => {
    return (
        <Card className="mt-3">
        <PostHeader authorId={authorId} date={date} userNick={userNick} />
        <PostBody text={text}/>
        <PostFooter postId={id} comments={comments} likes={likes}/>
      </Card>
    )
}

export default React.memo(SinglePost)
