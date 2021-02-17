import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useUserAvatar from "../../../hooks/useUserAvatar";
import { RootState } from "../../../store/reducer";
import { addComment as AddCommentAction } from "../../../store/postSlice/postAsyncActions";

interface Props {
  postId: string;
}

const AddComment: React.FC<Props> = ({ postId }) => {
  const [text, setText] = useState("");

  const { userId, userNick } = useSelector((state: RootState) => state.auth);
  const { imageUrl, loading } = useUserAvatar(userId as string);
  const dispatch = useDispatch();

  const publishPostHandler = () => {
    if (text.trim().length > 2 && !loading) {
      const comment = {
        text: text,
        authorNick: userNick as string,
        avatarUrl: imageUrl,
        date: new Date().getTime(),
      };
      dispatch(
        AddCommentAction({ comment: comment as Comment, postId: postId })
      );
      setText("");
    } else {
      alert("Comment have to contains at least 3 characters");
    }
  };

  return (
    <>
      <Form className="bg-white d-flex p-1  justify-content-between">
        <InputGroup className="w-100">
          <Form.Control
            placeholder="Write a post..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-100"
            as="textarea"
            rows={1}
          />
        </InputGroup>
        <InputGroup.Append>
        
        <Button onClick={publishPostHandler} size="sm" variant="dark">
          publish
        </Button>
        </InputGroup.Append>
      </Form>
    </>
  );
};

export default AddComment;
