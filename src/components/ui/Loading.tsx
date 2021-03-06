import { Container } from "react-bootstrap";
import Classes from "./loading.module.scss";

const Loading = () => {
  return (
    <Container className="d-flex w-100 h-100 jc-center ac-center">
      <div className={Classes.ldsring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default Loading;
