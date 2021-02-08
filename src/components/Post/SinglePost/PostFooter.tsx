import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleLike } from "../../../store/postSlice/postSlice";
import { RootState } from "../../../store/reducer";

interface Props {
  likes: number;
  postId: string;
}

const PostFooter: React.FC<Props> = ({ likes, postId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);

  const addLike = () => {
    if (userId) {
      dispatch(toogleLike({ postId: postId, userId: userId }));
    }
  };
  return (
    <Card.Footer className="d-flex bg-white">
      <Button onClick={addLike} variant='white'  className="p-1">
        <FaHeart className="mr-1 text-danger align-top mt-1" />
        <span>{likes}</span>
      </Button>
    </Card.Footer>
  );
};

export default PostFooter;
