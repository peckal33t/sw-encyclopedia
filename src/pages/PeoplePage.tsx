import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_PeopleResponse } from "../types/People.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";

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

  const getPeople = async (page = 1) => {
    setPeople(null);
    setIsLoading(true);
    setError(null);
    setSearchInput("");

    try {
      const data = await API.getResources<SW_PeopleResponse>("people", page);
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

  const searchPeople = async (searchQuery: string, page = 1) => {
    setPeople(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.searchResource<SW_PeopleResponse>(
        "people",
        searchQuery,
        page
      );
      setPeople(data);
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

    searchPeople(trimmedSearchInput, 1);
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
      getPeople(newPage);
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
      searchPeople(searchParamsQuery, page);
    } else {
      getPeople(page);
    }
  }, [searchParamsQuery, searchParamsPage]);

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
          label="Search for a person"
        />
      )}
      {!isLoading && !error && people && (
        <>
          {people.data.length > 0 && searchParamsQuery ? (
            <p>
              {people.total} search result for "{searchParamsQuery}"
            </p>
          ) : (
            <p>Showing all {people.total} People</p>
          )}
          <Row>
            {people.data.map((person) => (
              <Col key={person.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{person.name}</Card.Title>
                  <Card.Text>
                    <strong>Birth year</strong>: {person.birth_year}
                  </Card.Text>
                  <Card.Text>
                    <strong>Playing in</strong>: {person.films_count} films
                  </Card.Text>
                  <div className="d-flex justify-content-start">
                    <Button
                      className="custom-button-text"
                      onClick={() => {
                        navigate(`/people/${person.id}`);
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
            currentPage={people.current_page}
            lastPage={people.last_page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default PeoplePage;
