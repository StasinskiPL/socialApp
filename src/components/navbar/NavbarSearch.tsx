import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface Props{
  width:number,
}

const NavbarSearch:React.FC<Props> = ({width}) => {
  return (
    <Form inline className={`bg-light w-100 ${width < 480 ? "p-3" : null}`}>
        <InputGroup className="w-100">
          <FormControl type="text" placeholder="Search" className="rounded-0" />
          <InputGroup.Append>
            <Button variant="outline-ligth" size="sm" className="rounded-0">
              <FaSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>
    </Form>
  );
};

export default NavbarSearch;
