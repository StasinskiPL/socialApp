import React from "react";
import { Container } from "react-bootstrap";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import "./comment.scss"

interface Props {
  postId: string;
  comments: Comment[];
}

const CommentsContainer: React.FC<Props> = ({ comments, postId }) => {

  return (
    <Container fluid className="p-0">
      <CommentsList comments={comments} />
      <AddComment postId={postId} />
    </Container>
  );
};

export default CommentsContainer;
