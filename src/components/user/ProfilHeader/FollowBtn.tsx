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

const FollowBtn: React.FC = () => {
  const { userId, userNick } = useSelector((state: RootState) => state.auth);
  const { profilUserId } = useSelector((state: RootState) => state.user);
  const [userToFollow, setUserToFollow] = useState<UserToFollow | null>(null);
  const { imageUrl } = useUserAvatar(userId as string);

  useEffect(() => {
    if (profilUserId) {
      db.collection("users")
        .doc(profilUserId)
        .get()
        .then((doc) => {
          if (doc && doc.data()) {
            const id = profilUserId;
            const { avatarUrl, nick } = doc.data() as any;
            const user: UserToFollow = {
              id: id,
              nick,
              avatarUrl,
            };
              setUserToFollow(user);
          }
        });
    }
  }, [profilUserId]);

  const followHandler = () => {
    if (userId && userToFollow) {
      console.log(userToFollow)
      console.log(userId)
      db.collection("users")
        .doc(userId)
        .update({
          following: firebase.firestore.FieldValue.arrayUnion({
            ...userToFollow,
            avatarUrl: userToFollow.avatarUrl ? userToFollow.avatarUrl : ""
          }),
        });
      db.collection("users")
        .doc(userToFollow.id)
        .update({
          followers: firebase.firestore.FieldValue.arrayUnion({
            id: userId,
            nick: userNick,
            avatarUrl: imageUrl ? imageUrl : "",
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
        Follow
      </Button>
    </div>
  );
};

export default memo(FollowBtn);
