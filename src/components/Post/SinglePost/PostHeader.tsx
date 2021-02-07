import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserAvatar from "../../../hooks/useUserAvatar";
import avatarUrl from "../../../assets/images/avatar.png";

interface Props {
  authorId: string;
  date: number;
  userNick: string;
}

const PostHeader: React.FC<Props> = ({ date, authorId, userNick }) => {
  const { imageUrl } = useUserAvatar(authorId);

  return (
    <Card.Header className="d-flex pb-0 bg-white border-bottom-0">
      <Link to={`/user/${userNick}`} className="post-avatar">
        <img src={imageUrl ? imageUrl : avatarUrl} alt="avatar" />
      </Link>
      <div className="ml-3 d-lfex flex-column">
        <Link to={`/user/${userNick}`} className="h3 text-dark">
          {userNick}
        </Link>
        <p className="mb-0">{date}</p>
      </div>
    </Card.Header>
  );
};

export default PostHeader;
