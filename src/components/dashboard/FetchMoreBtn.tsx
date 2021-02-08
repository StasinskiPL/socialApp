import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  fetchMoreFollowersPost,
  fetchMorePost,
} from "../../store/postSlice/postAsyncActions";
import { PostsType } from "./Dashboard";

interface Props {
  postType: PostsType;
}

const FetchMoreBtn: React.FC<Props> = ({ postType }) => {
  const dispatch = useDispatch();

  const fetchMorePostsHandler = () => {
    if (postType === PostsType.ALL) {
      dispatch(fetchMorePost());
    } else if (postType === PostsType.FOLLOWED) {
      dispatch(fetchMoreFollowersPost());
    }
  };

  return (
    <Button
      onClick={fetchMorePostsHandler}
      className="w-100 mt-3 mb-5"
      variant="outline-dark"
    >
      Załaduj więcej postów
    </Button>
  );
};

export default FetchMoreBtn;
