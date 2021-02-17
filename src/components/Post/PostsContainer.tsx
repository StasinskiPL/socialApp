import React from "react";
import SinglePost from "./SinglePost/index";
import "./post.scss";

interface Props {
  posts: Post[];
}

const PostsContainer: React.FC<Props> = ({ posts }) => {
  return (
    <section className="posts">
      {posts.map((post) => {
        return <SinglePost {...post} key={post.id} />;
      })}
    </section>
  );
};

export default PostsContainer;
