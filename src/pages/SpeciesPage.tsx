import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_SpeciesResponse } from "../types/Species.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SpeciesPage = () => {
  const [species, setSpecies] = useState<SW_SpeciesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchParamsQuery = searchParams.get("query");
  const searchParamsPage = searchParams.get("page");

  const getSpecies = async (resource: string, page = 1) => {
    setSpecies(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_SpeciesResponse>(resource, page);
      setSpecies(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Stop with the errors!");
      }
    }
    setIsLoading(false);
  };

  const searchSpecies = async (searchQuery: string, page = 1) => {
    setSpecies(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.searchResource<SW_SpeciesResponse>(
        "species",
        searchQuery,
        page
      );
      setSpecies(data);
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

    searchSpecies(trimmedSearchInput, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (searchParamsQuery) {
      setSearchParams({
        query: searchParamsQuery,
        page: newPage.toString(),
      });
    } else {
      setSearchParams({
        page: newPage.toString(),
      });
      getSpecies("species", newPage);
    }
  };

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    const page = searchParamsPage ? parseInt(searchParamsPage) : 1;
    if (searchParamsQuery) {
      setSearchInput(searchParamsQuery);
      searchSpecies(searchParamsQuery, page);
    } else {
      getSpecies("species");
    }
  }, []);

  return (
    <>
      <>
        <div>
          <Form className="mb-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="searchQuery">
              <Form.Label>Search for specie</Form.Label>
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
        {isLoading && <p>Loading...</p>}
        {error && <Alert variant="warning">{error}</Alert>}
        {!isLoading && !error && species && (
          <Row>
            {species.data.map((specie) => (
              <Col key={specie.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{specie.name}</Card.Title>
                  <Card.Text>Speaking language: {specie.language}</Card.Text>
                  <Card.Text>Appears in: {specie.films_count} films</Card.Text>
                  <div className="d-flex justify-content-start">
                    <Button
                      onClick={() => {
                        navigate(`/species/${specie.id}`);
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

export default SpeciesPage;
