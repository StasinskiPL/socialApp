import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { db } from "../../../firebase";
import NewUserComp from "./NewUser";

interface NewUser {
  avatarUrl: string;
  nick: string;
}

const NewUsers = () => {
  const [newUsers, setNewUsers] = useState<NewUser[]>([]);

  useEffect(() => {
    db.collection("users")
      .where("avatarUrl", "!=", null)
      .orderBy("avatarUrl")
      .orderBy("createdAt", "desc")
      .limit(9)
      .get()
      .then((doc) => {
        const data = doc.docs.map((doc) => doc.data());
        const mapNewUser = data.map((user) => ({
          avatarUrl: user.avatarUrl,
          nick: user.nick,
        }));
        setNewUsers(mapNewUser.reverse());
      });
  }, []);

  return (
    <div className="profil-infos p-2  mt-3 rounded bg-white">
      <h4 className="p-2 pb-0 mb-1">New Users</h4>
      <Container fluid>
        <Row>
          {newUsers.map((user, index) => (
            <NewUserComp
              avatarUrl={user.avatarUrl}
              nick={user.nick}
              key={index}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NewUsers;
