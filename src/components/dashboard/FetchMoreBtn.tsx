import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchMorePost } from "../../store/postSlice";

const FetchMoreBtn = () => {
  const dispatch = useDispatch();

  const fetchMorePostsHandler = () => {
    dispatch(fetchMorePost());
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
