import { Button, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import FollowLink from "./FollowLink";

interface Props {
  list: Follower[];
  title: string;
  slug: string;
}

const FollowList: React.FC<Props> = ({ list,title,slug }) => {
  const { nick }: { nick: string } = useParams();

  return (
    <div className="profil-infos p-2  mt-3 rounded bg-white">
      <h4 className="p-2 pb-0 mb-1">{title}</h4>
      <Container fluid>
        <Row>
          {list.map((follower, index) => (
            <FollowLink
              avatarUrl={follower.avatarUrl}
              nick={follower.nick}
              key={index}
            />
          ))}
        </Row>
      </Container>

      {list.length > 9 && (
        <Button as={Link} to={`/user/${nick}/${slug}`} variant="secondary" className="w-100">
        Show More
      </Button>
      )}
    </div>
  );
};

export default FollowList;
