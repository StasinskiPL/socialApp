import React from "react";
import { Row } from "react-bootstrap";
import SingleComment from "./SingleComment";

interface Props {
    comments:Comment[]
}

const CommentsList:React.FC<Props> = ({comments}) => {
  return (
    <Row className="px-3">
    {comments.map((comment,index)=><SingleComment key={index} comment={comment} />)}
    </Row>
  );
};

export default CommentsList;
