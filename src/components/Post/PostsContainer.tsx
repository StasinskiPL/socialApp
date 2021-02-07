import React from 'react'
import SinglePost from './SinglePost'


interface Props{
    posts: Post[]
}

const PostsContainer:React.FC<Props> = ({posts}) => {
    return (
        <section className="posts">
            {posts.map((post,index)=>{
                return <SinglePost {...post} key={index}/>
            })}
            
        </section>
    )
}

export default PostsContainer