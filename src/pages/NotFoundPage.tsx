import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const NotFoundPage = () => {
  return (
    <>
      <h1>The page you are reaching for could not be found</h1>

      <Link to="/">
        <Button variant="primary">Return to the Home page</Button>
      </Link>
    </>
  );
};

export default NotFoundPage;
