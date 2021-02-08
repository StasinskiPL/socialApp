import React from 'react'
import { Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import gfm  from "remark-gfm"


interface Props {
  text: string
}

const PostBody: React.FC<Props> = ({ text }) => {
  return (
    <Card.Body className="pl-4 pt-2 ml-1">
        <ReactMarkdown plugins={[gfm]} children={text} />
    </Card.Body>
  )
}

export default PostBody
