import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_PlanetsResponse } from "../types/Planets.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const PlanetsPage = () => {
  const [planets, setPlanets] = useState<SW_PlanetsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchParamsQuery = searchParams.get("query");
  const searchParamsPage = searchParams.get("page");

  const getPlanets = async (resource: string, page = 1) => {
    setPlanets(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.getResources<SW_PlanetsResponse>(resource, page);
      setPlanets(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Stop with the errors!");
      }
    }
    setIsLoading(false);
  };

  const searchPlanets = async (searchQuery: string, page = 1) => {
    setPlanets(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.searchResource<SW_PlanetsResponse>(
        "planets",
        searchQuery,
        page
      );
      setPlanets(data);
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

    searchPlanets(trimmedSearchInput, 1);
  };

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    getPlanets("planets");
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <Alert variant="warning">{error}</Alert>}
      <div>
        <Form className="mb-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="searchQuery">
            <Form.Label>Search for planet</Form.Label>
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
      {!isLoading && !error && planets && (
        <Row>
          {planets.data.map((planet) => (
            <Col key={planet.id} xs={12} md={6} lg={4} className="mb-3">
              <Card className="p-3">
                <Card.Title>{planet.name}</Card.Title>
                <Card.Text>Appears in: {planet.films_count} films</Card.Text>
                <Button
                  onClick={() => {
                    navigate(`/planets/${planet.id}`);
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

export default PlanetsPage;
