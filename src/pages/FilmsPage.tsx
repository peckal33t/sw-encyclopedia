import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_FilmsResponse } from "../types/Films.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";

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

  const getFilms = async (page = 1) => {
    setFilms(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_FilmsResponse>("films", page);
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

  const searchFilms = async (searchQuery: string, page = 1) => {
    setFilms(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.searchResource<SW_FilmsResponse>(
        "films",
        searchQuery,
        page
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
      query: trimmedSearchInput,
      page: "1",
    });

    searchFilms(trimmedSearchInput, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (searchParamsQuery) {
      setSearchParams({
        query: searchParamsQuery,
        page: newPage.toString(),
      });
      searchFilms(searchParamsQuery, newPage);
    } else {
      setSearchParams({
        page: newPage.toString(),
      });
      getFilms(newPage);
    }
  };

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    const page = searchParamsPage ? parseInt(searchParamsPage) : 1;
    if (searchParamsQuery) {
      setSearchInput(searchParamsQuery);
      searchFilms(searchParamsQuery, page);
    } else {
      getFilms(page);
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
        label="Search for a film"
      />
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
                  <div className="d-flex justify-content-start">
                    <Button
                      onClick={() => {
                        navigate(`/films/${film.id}`);
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
          <Pagination
            currentPage={films.current_page}
            lastPage={films.last_page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default FilmsPage;
