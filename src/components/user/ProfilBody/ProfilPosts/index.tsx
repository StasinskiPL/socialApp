import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store/reducer";
import AddPost from "../../../Post/AddPost";

const ProfilPosts: React.FC = () => {
  const [isOwnProfil, setIsOwnProfil] = useState(false);
  const { userNick } = useSelector((state: RootState) => state.auth);

  const { nick }: { nick: string } = useParams();

  useEffect(() => {
    setIsOwnProfil(nick === userNick);
  }, [nick, userNick]);
  return (
    <Col className="mt-3" lg="7">
      {isOwnProfil && <AddPost />}
    </Col>
  );
};

export default ProfilPosts;
