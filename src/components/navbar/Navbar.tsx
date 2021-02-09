import { Container, Navbar } from "react-bootstrap";
import NavbarLogo from "./NavbarLogo";
import NavbarSearch from "./NavbarSearch";
import "./navbar.scss";
import NavbarNavigation from "./NavbarNavigation";
import { useState, useEffect } from "react";

const Nav: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  },[]);

  return (
    <>
      <Navbar bg="dark" className="navbar fixed-top">
        <Container className="d-flex w-100 justify-content-beetween navbar-center">
          <NavbarLogo />
          {width > 480 && <NavbarSearch width={width} />}
          <NavbarNavigation />
        </Container>
      </Navbar>
      {width < 480 && <NavbarSearch width={width} />}
    </>
  );
};

export default Nav;
