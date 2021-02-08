import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../../../../store/postSlice";
import { RootState } from "../../../../store/reducer";
import AddPost from "../../../Post/AddPost";
import PostsContainer from "../../../Post/PostsContainer";

const ProfilPosts: React.FC = () => {
  const [isOwnProfil, setIsOwnProfil] = useState(false);
  const { userNick } = useSelector((state: RootState) => state.auth);
  const { userPosts, loadingUserPosts } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch();

  const { nick }: { nick: string } = useParams();

  useEffect(() => {
    dispatch(fetchUserPosts({ nick: nick }));
  }, [nick, dispatch]);

  useEffect(() => {
    setIsOwnProfil(nick === userNick);
  }, [nick, userNick]);
  return (
    <Col lg="7">
      {isOwnProfil && (
        <div className="mt-3">
          <AddPost />
        </div>
      )}
      {!loadingUserPosts && <PostsContainer posts={userPosts} />}
    </Col>
  );
};

export default ProfilPosts;
