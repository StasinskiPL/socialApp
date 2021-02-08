import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase";
import FollowLink from "./FollowLink";

interface Follower {
  avatarUrl: string;
  nick: string;
}

const Following = () => {
  const [following, setFollowing] = useState<Follower[]>([]);
  const [profilUserId, setProfilUserId] = useState<string | null>(null);
  const { nick }: { nick: string } = useParams();

  useEffect(() => {
    if (profilUserId) {
      db.collection("users")
        .doc(profilUserId)
        .get()
        .then((doc) => {
          if (doc) {
            const data = doc.data();
            if (data && data.following) {
                setFollowing(data.following.splice(0, 9));
            //   I need set user id to null to prevent fetching wrong 
            //  followers while switching between profiles
              setProfilUserId(null)
            }
          }
        });
    }
  }, [profilUserId,nick]);

  // getProfilUserId From Nick
  useEffect(() => {
    setFollowing([]);
    db.collection("users")
      .where("nick", "==", nick)
      .get()
      .then((doc) => {
        if (doc && doc.docs && doc.docs[0]) {
          const id = doc.docs[0].id;
          if (id) {
            setProfilUserId(id);
          }
        }
      });
  }, [nick]);


  return (
    <div className="profil-infos p-2  mt-3 rounded bg-white">
      <h4 className="p-2 pb-0 mb-1">Obserwuje</h4>
      <Container fluid>
        <Row>
          {following.map((follower, index) => (
            <FollowLink
              avatarUrl={follower.avatarUrl}
              nick={follower.nick}
              key={index}
            />
          ))}
        </Row>
      </Container>

      {following.length > 9 && (
        <Button variant="secondary" className="w-100">
          Zobacz więcej
        </Button>
      )}
    </div>
  );
};

export default Following;
