import { Container } from "react-bootstrap";
import Avatar from "./Avatar";
import ProfilBg from "./ProfilBg";

export default function ProfilHeader(){
    return (
        <header>
            <Container>
                <ProfilBg/>
                <Avatar/>
            </Container>
        </header>
    )
}

