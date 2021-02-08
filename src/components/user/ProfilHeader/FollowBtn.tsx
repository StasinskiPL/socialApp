import React, { memo, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import { RootState } from "../../../store/reducer";
import firebase from "firebase/app";
import useUserAvatar from "../../../hooks/useUserAvatar";

interface UserToFollow {
  id: string;
  avatarUrl: string;
  nick: string;
}

interface Props {
  nick: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowBtn: React.FC<Props> = ({ nick, setLoading }) => {
  const { userId, userNick } = useSelector((state: RootState) => state.auth);
  const [userToFollow, setUserToFollow] = useState<UserToFollow | null>(null);
  const { imageUrl } = useUserAvatar(userId as string);

  // getProfilUserId From Nick
  useEffect(() => {
    db.collection("users")
      .where("nick", "==", nick)
      .get()
      .then((doc) => {
        if (doc && doc.docs && doc.docs[0]) {
          const id = doc.docs[0].id;
          const { avatarUrl, nick } = doc.docs[0].data();
          const user: UserToFollow = {
            id: id,
            nick,
            avatarUrl,
          };
          if (id) {
            setUserToFollow(user);
          }
        }
      });
    //  Prevent from
    //  Can't perform a React state update on an unmounted component
    return () => setLoading(true);
  }, [nick, setLoading]);

  const followHandler = () => {
    if (userId && userToFollow) {
      db.collection("users")
        .doc(userId)
        .update({
          following: firebase.firestore.FieldValue.arrayUnion(userToFollow),
        });
      db.collection("users")
        .doc(userToFollow.id)
        .update({
          followers: firebase.firestore.FieldValue.arrayUnion({
            id: userId,
            nick: userNick,
            avatarUrl: imageUrl,
          }),
        });
    }
  };

  return (
    <div className="d-flex w-100 justify-content-end">
      <Button
        size="sm"
        className="mt-2  mb-0 px-4"
        onClick={followHandler}
        variant="outline-success"
      >
        Obserwuj
      </Button>
    </div>
  );
};

export default memo(FollowBtn);
