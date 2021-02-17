import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarUrl from "../../../assets/images/avatar.png";
import { RootState } from "../../../store/reducer";
import { MdPhotoCamera } from "react-icons/md";
import Loading from "../../ui/Loading";
import useUserAvatar from "../../../hooks/useUserAvatar";
import { getUserId } from "../../../store/userSlice";

interface Props {
  isOwnProfil: boolean;
  nick: string;
}

const Avatar: React.FC<Props> = ({ isOwnProfil, nick }) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { profilUserId, loading } = useSelector(
    (state: RootState) => state.user
  );
  const { imageUrl, loading: loadingAvatar, saveImageToDB } = useUserAvatar(
    profilUserId || ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserId({ nick }));
  }, [nick, dispatch]);

  const clickFileInput = () => {
    if (isOwnProfil) {
      inputRef.current.click();
    }
  };

  // add avatar to db
  const handlerUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 5000000) {
        return alert("Your avatar size is too large");
      }
      saveImageToDB(file, nick);
    }
  };

  if (loadingAvatar || loading) {
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
        <img
          loading="lazy"
          src={imageUrl ? imageUrl : avatarUrl}
          alt="avatar"
        ></img>
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

export default memo(Avatar);
