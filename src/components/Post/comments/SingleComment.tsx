import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import defualtAvatar from "../../../assets/images/avatar.png";
import moment from "moment";

const mapDate = (date: number) => {
  return moment(date).fromNow();
};

interface Props {
  comment: Comment;
}

const SingleComment: React.FC<Props> = ({ comment }) => {
  const {
     text, avatarUrl, authorNick, date 
  } = comment ;

  return (
    <Col className="p-2 w-100 mb-3 bg-white col-12">
      <Card>
        <Card.Body className="d-flex align-items-stretch p-2 bg-white">
          <Link to={`/user/${authorNick}`} className="comment-img">
            <img
              loading="lazy"
              src={avatarUrl ? avatarUrl : defualtAvatar}
              alt="avatar"
            />
          </Link>
          <div className="ml-2">
            <Link to={`/user/${authorNick}`} className="h5 text-dark">
              {authorNick}
            </Link>
            <p className="mb-0">{mapDate(date)}</p>
          </div>
          <p className="ml-4 mb-0  bg-light rounded px-2 py-1 flex-fill align-self-stretch">
            {text}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleComment;
