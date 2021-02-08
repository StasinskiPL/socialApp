import { useEffect, useState } from "react";
import { db, storage } from "../firebase";

interface Return {
  loading: boolean;
  imageUrl: string | null;
  saveImageToDB: (file: any, userNick: string) => void;
}

const useUserAvatar = (userId: string): Return => {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const saveImageToDB = (file: any, userNick: string) => {
    setLoading(true);
    storage
      .ref(`/files/avatar/${userNick}`)
      .put(file)
      .then((res) => {
        res.ref.getDownloadURL().then((url) => {
          if (userId) {
            db.collection("users").doc(userId).update({
              avatarUrl: url,
            });
          }
          setLoading(false);
          setImageUrl(url);
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    if (userId) {
      db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (data) {
            const { avatarUrl } = data;
            setImageUrl(avatarUrl);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [userId]);

  return { imageUrl, loading, saveImageToDB };
};

export default useUserAvatar;
