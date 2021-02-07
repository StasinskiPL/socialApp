import React from 'react'
import { Card } from 'react-bootstrap'

interface Props{
    text:string
}

const PostBody:React.FC<Props> = ({text}) => {
    return (
        <Card.Body className="pl-4 pt-2 ml-1">
          <Card.Text className="post-text">
            {text}
          </Card.Text>
        </Card.Body>
    )
}

export default PostBody
