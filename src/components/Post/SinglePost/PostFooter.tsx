import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleLike } from "../../../store/postSlice/postSlice";
import { RootState } from "../../../store/reducer";
import Comments from "../comments";


interface Props {
  likes: string[];
  postId: string;
  comments: Comment[],
}

const PostFooter: React.FC<Props> = ({ likes, postId,comments }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const liked = likes.find((i) => i === userId);
    if (liked) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, userId]);

  const addLike = () => {
    if (userId) {
      dispatch(toogleLike({ postId: postId, userId: userId }));
    }
  };

  return (
    <>
    <Card.Footer className="d-flex bg-white">
      <Button onClick={addLike} variant="white" className="p-1">
        {alreadyLiked ? (
          <FaHeart className="mr-1 text-danger align-top mt-1" />
        ) : (
          <FaHeart className="mr-1 text-secondary align-top mt-1" />
        )}
        <span>{likes.length}</span>
      </Button>
      <div className="w-75 justify-content-center d-flex">
        <Button onClick={()=>setShowComments((e)=>!e)} variant="white" className="post-comment">
          <FaRegComment className="text-dark" />
          <span className="post-comment-count">{comments.length}</span>
        </Button>
      </div>
    </Card.Footer>
          {showComments && 
          <Comments postId={postId} comments={comments} />
          }

    </>
  );
};

export default PostFooter;
