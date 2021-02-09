import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowersPosts,
  fetchPosts,
} from "../../store/postSlice/postAsyncActions";
import { RootState } from "../../store/reducer";
import AddPost from "../Post/AddPost";
import PostsContainer from "../Post/PostsContainer";
import InfoColumn from "./InfoColumn/InfoColumn";
import "./dashboard.scss";
import FetchMoreBtn from "./FetchMoreBtn";
import LoadingPost from "../Post/LoadingPost";
import TooglePostType from "./TooglePostType";

export enum PostsType {
  ALL = "ALL",
  FOLLOWED = "FOLLOWED",
}

const Dashboard:React.FC = () => {
  const { posts, followersPosts, loadingPosts } = useSelector(
    (state: RootState) => state.posts
  );
  const [postType, setPostType] = useState<PostsType>(PostsType.ALL);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchFollowersPosts());
  }, [dispatch]);

  return (
      <Container className="mt-5">
        <Row>
          <Col lg="8" className="p-md-0">
            <AddPost />
            <TooglePostType setPostType={setPostType} />
            <PostsContainer
              posts={postType === PostsType.ALL ? posts : followersPosts}
            />
            {loadingPosts && <LoadingPost />}
            <FetchMoreBtn postType={postType} />
          </Col>
          <Col className="d-none d-lg-block mt-4 pt-3 pr-0 pl-3" lg="4">
            <InfoColumn />
          </Col>
        </Row>
      </Container>
  );
};

export default Dashboard;
