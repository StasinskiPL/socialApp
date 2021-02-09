import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import defualtAvatar from "../../assets/images/avatar.png";

const UserItem: React.FC<Follower> = ({ avatarUrl, nick }) => {
  return (
    <Col xs={12} sm={6}>
      <Link
        to={`/user/${nick}`}
        className="bg-white mb-2 text-dark p-2 rounded d-block"
      >
        <div className="d-flex align-items-center">
          <img
            className="fluid userList-img"
            src={avatarUrl ? avatarUrl : defualtAvatar}
            loading="lazy"
            alt="avatar"
          />
          <h4 className="ml-2">{nick}</h4>
        </div>
      </Link>
    </Col>
  );
};

export default UserItem;
