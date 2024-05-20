import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_FilmsResponse } from "../types/Films.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const FilmsPage = () => {
  const [films, setFilms] = useState<SW_FilmsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchParamsQuery = searchParams.get("query");
  const searchParamsPage = searchParams.get("page");

  const getFilms = async (resource: string) => {
    setFilms(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_FilmsResponse>(resource);
      setFilms(data);
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

  const searchFilms = async (searchQuery: string) => {
    setFilms(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.searchResource<SW_FilmsResponse>(
        "films",
        searchQuery,
        Number(searchParamsPage)
      );
      setFilms(data);
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
      query: searchInput,
      page: "1",
    });

    searchFilms(searchInput);
  };

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchParamsQuery) {
      setSearchInput(searchParamsQuery);
      searchFilms(searchParamsQuery);
    } else {
      getFilms("films");
    }
  }, [searchParamsQuery, searchParamsPage]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <Alert variant="warning">{error}</Alert>}
      <div>
        <Form className="mb-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="searchQuery">
            <Form.Label>Search for film</Form.Label>
            <Form.Control
              onChange={(e) => setSearchInput(e.target.value)}
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
      {!isLoading && !error && films && (
        <>
          {films.data.length > 0 && searchParamsQuery ? (
            <p>
              {films.total} search result for "{searchParamsQuery}"
            </p>
          ) : (
            <p>{films.total} results showing for Films</p>
          )}
          <Row>
            {films.data.map((film) => (
              <Col key={film.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{film.title}</Card.Title>
                  <Card.Text>Director: {film.director}</Card.Text>
                  <Card.Text>Release date: {film.release_date}</Card.Text>
                  <Button
                    onClick={() => {
                      navigate(`/films/${film.id}`);
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
        </>
      )}
    </>
  );
};

export default FilmsPage;
