import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Navbar.Brand>
      <Link to="/" className="text-light logo">
        ALBICJA
      </Link>
    </Navbar.Brand>
  );
};

export default NavbarLogo;
