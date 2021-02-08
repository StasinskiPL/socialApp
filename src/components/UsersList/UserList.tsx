import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
import UserItem from "./UserItem";
import { db } from "../../firebase";

const UserList: React.FC = () => {
  const [list, setList] = useState<Follower[]>([]);

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
    if (typeof value === "string") {
      db.collection("users")
        .orderBy("nick")
        .startAt(value)
        .endAt(value + "~")
        .get()
        .then((data) => {
          console.log(data);
          if (data) {
            data.docs.forEach((doc) => {
              console.log(doc.data());
            });
            console.log(data.docs[0]);
          }
        });
    } else if (typeof type === "string") {
      db.collection("users")
        .where("nick", "==", nick)
        .get()
        .then((data) => {
          if (data && data.docs[0]) {
            if (type.toLowerCase() === "obserwujacy") {
              const {
                followers,
              }: { followers: Follower[] } = data.docs[0].data() as {
                followers: Follower[];
              };
              if (followers) {
                setList(followers);
              }
            }
            if (type.toLowerCase() === "obserwuje") {
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
        });
    }
  }, [type, value, nick]);

  console.log(list);

  return (
    <>
      <Navbar />
      <Container>
        {/* {list.map((item, index) => (
          <UserItem {...item} key={index} />
        ))} */}
      </Container>
    </>
  );
};

export default UserList;
