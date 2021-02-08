import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store/reducer";
import Avatar from "./Avatar";
import FollowBtn from "./FollowBtn";
import ProfilBg from "./ProfilBg";

export default function ProfilHeader() {
  const [isOwnProfil, setIsOwnProfil] = useState(false);
  const [loading,setLoading] = useState(true);
  const { userNick } = useSelector((state: RootState) => state.auth);
  const { nick }: { nick: string } = useParams();

  useEffect(() => {
    setIsOwnProfil(nick === userNick);
    setLoading(false)
  }, [nick, userNick]);

  return (
    <header>
      <Container>
        <ProfilBg />
        <Avatar isOwnProfil={isOwnProfil} nick={nick} />
        {(!isOwnProfil && !loading) && 
        <FollowBtn nick={nick} setLoading={setLoading} />
        }
      </Container>
    </header>
  );
}
