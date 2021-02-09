import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatarUrl from "../../../assets/images/avatar.png";
import moment from "moment";
import { db } from "../../../firebase";

interface Props {
  authorId: string;
  date: number;
  userNick: string;
}

const mapDate = (date: number) => {
  return moment(date).fromNow();
};

const PostHeader: React.FC<Props> = ({ date, authorId, userNick }) => {
  const [authorImg, setAuthorImage] = useState<null | string>(null);

  useEffect(() => {
    if (authorId) {
      db.collection("users")
        .doc(authorId)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (data) {
            const { avatarUrl } = data;
            setAuthorImage(avatarUrl);
          }
        });
    }
  }, [authorId]);

  return (
    <Card.Header className="d-flex pb-0 bg-white border-bottom-0">
      <Link to={`/user/${userNick}`} className="post-avatar">
        <img loading="lazy" src={authorImg ? authorImg : avatarUrl} alt="avatar" />
      </Link>
      <div className="ml-3">
        <Link to={`/user/${userNick}`} className="h3 text-dark">
          {userNick}
        </Link>
        <p className="mb-0">{mapDate(date)}</p>
      </div>
    </Card.Header>
  );
};

export default React.memo(PostHeader);
