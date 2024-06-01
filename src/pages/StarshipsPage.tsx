import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_StarshipsResponse } from "../types/Starships.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";

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

  const getStarships = async (page = 1) => {
    setStarships(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_StarshipsResponse>(
        "starships",
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

  const searchStarships = async (searchQuery: string, page = 1) => {
    setStarships(null);
    setIsLoading(true);
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
      getStarships(newPage);
    }
  };

  useEffect(() => {
    if (!isLoading && inputSearchRef.current) {
      inputSearchRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    const page = searchParamsPage ? parseInt(searchParamsPage) : 1;
    if (searchParamsQuery) {
      setSearchInput(searchParamsQuery);
      searchStarships(searchParamsQuery, page);
    } else {
      getStarships(page);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {error && <Alert variant="warning">{error}</Alert>}
      {!isLoading && !error && (
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSubmit={handleSubmit}
          inputRef={inputSearchRef}
          label="Search for a starship"
        />
      )}
      {!isLoading && !error && starships && (
        <>
          {starships.data.length > 0 && searchParamsQuery ? (
            <p>
              {starships.total} search result for "{searchParamsQuery}"
            </p>
          ) : starships.data.length === 0 && searchParamsQuery ? (
            <p>
              {starships.total} search result for "{searchParamsQuery}"
            </p>
          ) : (
            <p>Showing all {starships.total} Starships</p>
          )}
          <Row>
            {starships.data.map((starship) => (
              <Col key={starship.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{starship.name}</Card.Title>
                  <Card.Text>
                    <strong>Max atmosphering speed</strong>:{" "}
                    {starship.max_atmosphering_speed} km/h
                  </Card.Text>
                  <Card.Text>
                    <strong>Appears in</strong>: {starship.films_count} films
                  </Card.Text>
                  <div className="d-flex justify-content-start">
                    <Button
                      className="custom-button-text"
                      onClick={() => {
                        navigate(`/starships/${starship.id}`);
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
            currentPage={starships.current_page}
            lastPage={starships.last_page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default StarshipsPage;
