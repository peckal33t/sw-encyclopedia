import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Error from "../assets/images/404.gif";

const NotFoundPage = () => {
  return (
    <Container className="py-3">
      <h1 className="h2">Error 404</h1>
      <h2>The page you are reaching for could Not be Found</h2>

      <div className="d-flex flex-column">
        <Image
          style={{ width: "37vw", height: "35vh" }}
          className="mb-3"
          src={Error}
          fluid
        />

        <Link to="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundPage;
