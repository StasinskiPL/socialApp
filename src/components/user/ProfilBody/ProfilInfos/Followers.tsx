import { Button, Container, Row } from "react-bootstrap";

import FollowLink from "./FollowLink";

interface Props {
  followers: Follower[];
}

const Followers: React.FC<Props> = ({ followers }) => {
  return (
    <div className="profil-infos p-2  mt-3 rounded bg-white">
      <h4 className="p-2 pb-0 mb-1">Obserwują</h4>
      <Container fluid>
        <Row>
          {followers.map((follower, index) => (
            <FollowLink
              avatarUrl={follower.avatarUrl}
              nick={follower.nick}
              key={index}
            />
          ))}
        </Row>
      </Container>

      {followers.length > 9 && (
        <Button variant="secondary" className="w-100">
          Zobacz więcej
        </Button>
      )}
    </div>
  );
};

export default Followers;
