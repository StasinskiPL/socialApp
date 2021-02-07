import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avaratUrl from "../../../assets/images/avatar.png";
import { RootState } from "../../../store/reducer";
import { MdPhotoCamera } from "react-icons/md";
import { db, storage } from "../../../firebase";
import Loading from "../../ui/Loading";
import useUserAvatar from "../../../hooks/useUserAvatar";

const Avatar: React.FC = () => {
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const [isOwnProfil, setIsOwnProfil] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);
  const { userNick,userId } = useSelector((state: RootState) => state.auth);
  const {imageUrl,loading,saveImageToDB} = useUserAvatar(userId || "")
  const { nick }: { nick: string } = useParams();

  useEffect(() => {
    setIsOwnProfil(nick === userNick);
  }, [nick, userNick]);

  const clickFileInput = () => {
    if (isOwnProfil) {
      inputRef.current.click();
    }
  };


// add avatar to db
  const handlerUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 2200000) {
        return alert("Avatar może mieć maksymalnie 2mb.");
      }
      saveImageToDB(file,nick)
    }
  };

  if (loading) {
    return (
      <article className="profil__avatar">
        <div className="profil__avatar-loading">
          <Loading />
        </div>
      </article>
    );
  }

  return (
    <article className="profil__avatar">
      <div
        tabIndex={0}
        className={`profil__avatar-img ${isOwnProfil && "own"}`}
        onClick={clickFileInput}
      >
        <img src={imageUrl ? imageUrl : avaratUrl} alt="avatar"></img>
        {isOwnProfil && (
          <>
            <div className="profil__avatar-file">
              <label htmlFor="avatar">
                <MdPhotoCamera />
              </label>
              <input
                ref={inputRef}
                type="file"
                onChange={handlerUploadAvatar}
                name="avatar"
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default Avatar;
