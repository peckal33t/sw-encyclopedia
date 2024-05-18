import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Star Wars Encyclopedia
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} end to="/">
              <Button variant="outline-light">Home</Button>
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/films">
              Films
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/people">
              People
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/planets">
              Planets
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/species">
              Species
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/starships">
              Starships
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/vehicles">
              Vehicles
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
