import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store/reducer";
import { setLoading } from "../../../store/userSlice";

import Avatar from "./Avatar";
import FollowBtn from "./FollowBtn";
import ProfilBg from "./ProfilBg";

export default function ProfilHeader() {
  const [isOwnProfil, setIsOwnProfil] = useState(false);
  const { userNick } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.user);
  const { nick }: { nick: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOwnProfil(nick === userNick);
    dispatch(setLoading());
  }, [nick, userNick, dispatch]);

  return (
    <header>
      <Container>
        <ProfilBg />
        <Avatar isOwnProfil={isOwnProfil} nick={nick} />
        {!isOwnProfil && !loading && <FollowBtn />}
      </Container>
    </header>
  );
}
