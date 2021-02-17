import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase";
import FollowList from "./FollowList";
import UserInfo from "./UserInfo";
import moment from "moment";

const Infos = () => {
  const { nick }: { nick: string } = useParams();
  const [createdAt, setCreatedAt] = useState<string>("");
  const [following, setFollowing] = useState<Follower[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
      setFollowers([])
      setFollowing([])
    db.collection("users")
      .where("nick", "==", nick)
      .get()
      .then((doc) => {
        if (doc.docs[0]) {
          const data = doc.docs[0].data();
          if (data) {
            if (data.createdAt) {
              setCreatedAt(moment(data.createdAt).format("DD.MM.YYYY"));
            }
            if (data.following) {
              setFollowing(data.following.splice(0, 9));
            }
            if (data.followers) {
              setFollowers(data.followers.splice(0, 9));
            }
          }
        }
      });
  }, [nick]);

  return (
    <Col className="p-3" lg="5">
      <UserInfo nick={nick} createdAt={createdAt} />
      <FollowList title="Following" slug="following" list={following} />
      <FollowList title="Followers" slug="followers" list={followers} />
    </Col>
  );
};

export default Infos;
