import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";

interface Props {
  width: number;
}

const NavbarSearch: React.FC<Props> = ({ width }) => {
  const [value, setValue] = useState("");
  const history = useHistory();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length >= 1) {
      history.push(`/search/${value}`);
      setValue("");
    }
  };
  return (
    <Form
      onSubmit={submitHandler}
      inline
      data-testid='searchform'
      className={`bg-light w-100 ${width < 480 ? "p-3" : null}`}
    >
      <InputGroup className="w-100">
        <FormControl
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          data-testid="search-input"
          placeholder="Search"
          className="rounded-0"
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="outline-ligth"
            data-testid="form-search-btn"
            size="sm"
            className="rounded-0"
          >
            <FaSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default NavbarSearch;
