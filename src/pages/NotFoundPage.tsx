import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Error from "../assets/images/404.gif";
import Loading from "../components/Loading";

const NotFoundPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="py-3">
      {loading ? (
        <Loading />
      ) : (
        <>
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
              <Button className="custom-button-text" variant="dark">
                Return to Home
              </Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default NotFoundPage;
