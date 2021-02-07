import React, { useState } from "react";
import { Button, Card, Form, Tab, Tabs } from "react-bootstrap";
import {FaShare} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { v4 as uuid } from 'uuid';
import { addPost as AddPostAction } from "../../store/postSlice";

const AddPost = () => {
    const [text,setText] = useState("")

    const {userId,userNick} = useSelector((state:RootState)=>state.auth)
    const dispatch = useDispatch()

    const publishPostHandler = ()=>{
        if(text.trim().length > 4){
          const post = {
            text: text,
            authorId: userId as string,
            date: new Date().getTime(),
            likes: 0,
            id:uuid(),
            userNick:userNick as string,
          }
            dispatch(AddPostAction(post))
            setText("")
        }else{
          alert("post musi mieć conajmniej pięć znaków")
        }
    }

  return (
    <>
      <Tabs defaultActiveKey="share" id="uncontrolled-tab-example">
        <Tab eventKey="share" title="Podzile się">
          <Card className="border-top-0">
            <Card.Body className="p-0">
            <Form.Control placeholder="Co się dzieje?" value={text} onChange={e=>setText(e.target.value)} className="w-100 border-0 p-3" as="textarea" rows={3} />
            </Card.Body>
              <Card.Footer className="d-flex bg-white p-2 justify-content-end">
              <Button onClick={publishPostHandler} size="sm" variant="dark"><FaShare className="mr-1 mt-1 align-top"/>Opublikuj</Button>

              </Card.Footer>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

export default AddPost;
