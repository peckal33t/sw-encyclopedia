import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Starship } from "../types/Starships.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import NavigateButton from "../components/NavigateButton";

const StarshipPage = () => {
  const [starship, setStarship] = useState<SW_Starship | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const starshipId = Number(id);

  const getStarshipInfo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getResourceById<SW_Starship>("starships", id);
      setStarship(data);
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
    const validResourceId = Number(starshipId);
    if (!validResourceId) {
      return;
    }
    getStarshipInfo(starshipId);
  }, [starshipId]);

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && starship && (
        <div>
          <Row>
            <Col key={starship.id} xs={12} md={6} lg={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2 className="h4">
                      <b>{starship.name}</b>
                    </h2>
                  </Card.Title>
                  <Card.Title>Attributes</Card.Title>
                  <Card.Text>
                    <b>Model</b>: {starship.model}
                  </Card.Text>
                  <Card.Text>
                    <b>Starship class</b>: {starship.starship_class}
                  </Card.Text>
                  <Card.Text>
                    <b>Manufacturer</b>: {starship.manufacturer}
                  </Card.Text>
                  <Card.Text>
                    <b>Cost in credits</b>: {starship.cost_in_credits}
                  </Card.Text>
                  <Card.Text>
                    <b>Length</b>: {starship.length}
                  </Card.Text>
                  <Card.Text>
                    <b>Crew</b>: {starship.crew}
                  </Card.Text>
                  <Card.Text>
                    <b>Passengers</b>: {starship.passengers}
                  </Card.Text>
                  <Card.Text>
                    <b>Max atmosphering speed</b>:{" "}
                    {starship.max_atmosphering_speed} km/h
                  </Card.Text>
                  <Card.Text>
                    <b>Hyperdrive rating</b>: {starship.hyperdrive_rating}
                  </Card.Text>
                  <Card.Text>
                    <b>MGLT</b>: {starship.MGLT}
                  </Card.Text>
                  <Card.Text>
                    <b>Cargo capacity</b>: {starship.cargo_capacity}
                  </Card.Text>
                  <Card.Text>
                    <b>Consumables</b>: {starship.consumables}
                  </Card.Text>
                  <Card.Title>Links</Card.Title>
                  <Card.Text>
                    <b>Pilots</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {starship.pilots.map((pilot) => (
                      <ListGroup.Item
                        key={pilot.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/people/${pilot.id}`);
                        }}
                      >
                        <p>{pilot.name}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Text>
                    <b>Films</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {starship.films.map((film) => (
                      <ListGroup.Item
                        key={film.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/films/${film.id}`);
                        }}
                      >
                        <p>{film.title}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <NavigateButton />
        </div>
      )}
    </>
  );
};
export default StarshipPage;
