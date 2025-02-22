import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="orbitron">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span style={{ color: "#ffff00", textShadow: "7px 7px 2px black" }}>
            Star Wars
          </span>{" "}
          Encyclopedia
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
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
