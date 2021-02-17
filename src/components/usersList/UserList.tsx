import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import UserItem from "./UserItem";
import { db } from "../../firebase";
import "./userList.scss";
import Loading from "../ui/Loading";

const UserList: React.FC = () => {
  const [list, setList] = useState<Follower[]>([]);
  const [backLink, setBackLink] = useState<string>("/");
  const [loading, setLoading] = useState(true);

  const {
    nick,
    type,
    value,
  }: {
    type: string | undefined;
    value: string | undefined;
    nick: string | undefined;
  } = useParams();
  useEffect(() => {
    setList([]);
    setLoading(true);
    if (typeof value === "string") {
      db.collection("users")
        .where("nick", ">=", value)
        .where("nick", "<=", value + "\uf8ff")
        .get()
        .then((data) => {
          if (data.docs.length > 0) {
            const userList = data.docs.map((item) => ({
              nick: item.data().nick,
              avatarUrl: item.data().avatarUrl,
            }));
            setList(userList);
          }
          setLoading(false);
        });
      setBackLink("/");
    } else if (typeof type === "string") {
      db.collection("users")
        .where("nick", "==", nick)
        .get()
        .then((data) => {
          if (data && data.docs[0]) {
            if (type.toLowerCase() === "followers") {
              const {
                followers,
              }: { followers: Follower[] } = data.docs[0].data() as {
                followers: Follower[];
              };
              if (followers) {
                setList(followers);
              }
            }
            if (type.toLowerCase() === "following") {
              const {
                following,
              }: { following: Follower[] } = data.docs[0].data() as {
                following: Follower[];
              };
              if (following) {
                setList(following);
              }
            }
          }
          setLoading(false);
        });
      setBackLink(`/user/${nick}`);
    }
  }, [type, value, nick]);

  return (
    <Container className="mt-5">
      <Button as={Link} variant="outline-dark" className="px-5" to={backLink}>
        Back
      </Button>
      <Row className="mt-5 g-1">
        {loading && <Loading />}
        {list.map((item, index) => (
          <UserItem {...item} key={index} />
        ))}
        {!loading && list.length === 0 && (
          <Col>
            <h4>No one user match.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserList;
