import React from 'react'

interface Post{
    date:number,
    text:string,
    authorId: string,
    likes:number,
}

const SinglePost:React.FC<Post> = ({authorId,date,likes,text}) => {
    return (
        <div>
            
        </div>
    )
}

export default SinglePost
