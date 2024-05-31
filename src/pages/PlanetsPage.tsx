import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_PlanetsResponse } from "../types/Planets.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";

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

  const getPlanets = async (page = 1) => {
    setPlanets(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_PlanetsResponse>("planets", page);
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
      getPlanets(newPage);
    }
  };

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    const page = searchParamsPage ? parseInt(searchParamsPage) : 1;
    if (searchParamsQuery) {
      setSearchInput(searchParamsQuery);
      searchPlanets(searchParamsQuery, page);
    } else {
      getPlanets(page);
    }
  }, [searchParamsQuery, searchParamsPage]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <Alert variant="warning">{error}</Alert>}
      <SearchForm
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSubmit={handleSubmit}
        inputRef={inputSearchRef}
        label="Search for a planet"
      />
      {!isLoading && !error && planets && (
        <>
          {planets.data.length > 0 && searchParamsQuery ? (
            <p>
              {planets.total} search result for "{searchParamsQuery}"
            </p>
          ) : (
            <p>{planets.total} results showing for Planets</p>
          )}
          <Row>
            {planets.data.map((planet) => (
              <Col key={planet.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{planet.name}</Card.Title>
                  <Card.Text>
                    Population: {planet.population} residents
                  </Card.Text>
                  <Card.Text>Appears in: {planet.films_count} films</Card.Text>
                  <div className="d-flex justify-content-start">
                    <Button
                      className="custom-button-text"
                      onClick={() => {
                        navigate(`/planets/${planet.id}`);
                      }}
                      variant="dark"
                    >
                      Read more
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            currentPage={planets.current_page}
            lastPage={planets.last_page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default PlanetsPage;
