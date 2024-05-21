import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_PeopleResponse } from "../types/People.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const PeoplePage = () => {
  const [people, setPeople] = useState<SW_PeopleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchParamsQuery = searchParams.get("query");
  const searchParamsPage = searchParams.get("page");

  const getPeople = async (resource: string, page = 1) => {
    setPeople(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_PeopleResponse>(resource, page);
      setPeople(data);
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Stop with the errors!");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPeople("people");
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <Alert variant="warning">{error}</Alert>}
      {!isLoading && !error && people && (
        <Row>
          {people.data.map((person) => (
            <Col key={person.id} xs={12} md={6} lg={4} className="mb-3">
              <Card className="p-3">
                <Card.Title>{person.name}</Card.Title>
                <Card.Text>Birth year: {person.birth_year}</Card.Text>
                <Card.Text>In films: {person.films_count}</Card.Text>
                <Button
                  onClick={() => {
                    navigate(`/people/${person.id}`);
                  }}
                  variant="primary"
                  size="sm"
                >
                  Read more
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default PeoplePage;
