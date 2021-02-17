import React from "react";
import { Nav } from "react-bootstrap";
import { PostsType } from "./Dashboard";

interface Props {
  setPostType: React.Dispatch<React.SetStateAction<PostsType>>;
}

const TooglePostType: React.FC<Props> = ({setPostType }) => {
  return (
    <Nav className="mt-2 mb-0" fill variant="tabs" defaultActiveKey="all">
      <Nav.Item onClick={()=>setPostType(PostsType.ALL)}>
        <Nav.Link  eventKey="all">All</Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={()=>setPostType(PostsType.FOLLOWED)}>
        <Nav.Link eventKey="followed">Following</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TooglePostType;
