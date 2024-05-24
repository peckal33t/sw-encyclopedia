import { useState, useEffect, useRef } from "react";
import * as API from "../services/API";
import { SW_VehiclesResponse } from "../types/Vehicles.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<SW_VehiclesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchParamsQuery = searchParams.get("query");
  const searchParamsPage = searchParams.get("page");

  const getVehicles = async (resource: string, page = 1) => {
    setVehicles(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.getResources<SW_VehiclesResponse>(resource, page);
      setVehicles(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Stop with the errors!");
      }
    }
    setIsLoading(false);
  };

  const searchVehicles = async (searchQuery: string, page = 1) => {
    setVehicles(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await API.searchResource<SW_VehiclesResponse>(
        "vehicles",
        searchQuery,
        page
      );
      setVehicles(data);
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
    inputSearchRef.current?.focus();
  }, []);

  useEffect(() => {
    getVehicles("vehicles");
  }, []);

  return (
    <>
      <>
        <div>
          <Form className="mb-4">
            <Form.Group className="mb-3" controlId="searchQuery">
              <Form.Label>Search for vehicle</Form.Label>
              <Form.Control
                placeholder="Enter your search"
                type="text"
                value={searchInput}
                ref={inputSearchRef}
              />
              <div className="d-flex justify-content-end p-2">
                <Button disabled>Search</Button>
              </div>
            </Form.Group>
          </Form>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <Alert variant="warning">{error}</Alert>}
        {!isLoading && !error && vehicles && (
          <Row>
            {vehicles.data.map((vehicle) => (
              <Col key={vehicle.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="p-3">
                  <Card.Title>{vehicle.name}</Card.Title>
                  <Card.Text>Model: {vehicle.model}</Card.Text>
                  <Card.Text>Appears in: {vehicle.films_count} films</Card.Text>
                  <div className="d-flex justify-content-start">
                    <Button
                      onClick={() => {
                        navigate(`/vehicles/${vehicle.id}`);
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

export default VehiclesPage;
