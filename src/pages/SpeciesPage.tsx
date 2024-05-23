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

  useEffect(() => {
    getSpecies("species");
  }, []);

  return (
    <>
      <>
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
