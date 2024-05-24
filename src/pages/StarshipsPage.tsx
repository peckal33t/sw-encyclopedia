import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_StarshipsResponse } from "../types/Starships.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const StarshipsPage = () => {
  const [starships, setStarships] = useState<SW_StarshipsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchParamsQuery = searchParams.get("query");
  const searchParamsPage = searchParams.get("page");

  const getStarships = async (resource: string, page = 1) => {
    setStarships(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.getResources<SW_StarshipsResponse>(resource, page);
      setStarships(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Stop with the errors!");
      }
    }
    setIsLoading(false);
  };

  const searchStarships = async (searchQuery: string, page = 1) => {
    setStarships(null);
    setIsLoading(false);
    setError(null);

    try {
      const data = await API.searchResource<SW_StarshipsResponse>(
        "starships",
        searchQuery,
        page
      );
      setStarships(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Stop with the errors!");
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedSearchInput = searchInput.trim();

    if (!trimmedSearchInput.length) {
      return;
    }

    setSearchParams({
      query: trimmedSearchInput,
      page: "1",
    });

    searchStarships(trimmedSearchInput, 1);
  };

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    getStarships("starships");
  }, []);

  return (
    <>
      <>
        {isLoading && <p>Loading...</p>}
        {error && <Alert variant="warning">{error}</Alert>}
        <div>
          <Form className="mb-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="searchQuery">
              <Form.Label>Search for starship</Form.Label>
              <Form.Control
                placeholder="Enter your search"
                type="text"
                value={searchInput}
                ref={inputSearchRef}
              />
              <div className="d-flex justify-content-end p-2">
                <Button
                  onClick={handleSubmit}
                  onSubmit={handleSubmit}
                  disabled={searchInput.trim().length < 1}
                >
                  Search
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
        {!isLoading && !error && starships && (
          <Row>
            {starships.data.map((starship) => (
              <Col key={starship.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{starship.name}</Card.Title>
                  <Card.Text>Manufacturer: {starship.manufacturer}</Card.Text>
                  <Card.Text>
                    Appears in: {starship.films_count} films
                  </Card.Text>
                  <div className="d-flex justify-content-start">
                    <Button
                      onClick={() => {
                        navigate(`/starships/${starship.id}`);
                      }}
                      variant="primary"
                    >
                      Read more
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </>
    </>
  );
};

export default StarshipsPage;
