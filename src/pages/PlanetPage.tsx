import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Planet } from "../types/Planets.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import NavigateButton from "../components/NavigateButton";
import Loading from "../components/Loading";

const PlanetPage = () => {
  const [planet, setPlanet] = useState<SW_Planet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const planetId = Number(id);

  const getPlanetInfo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getResourceById<SW_Planet>("planets", id);
      setPlanet(data);
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
    const validResourceId = Number(planetId);
    if (!validResourceId) {
      return;
    }
    getPlanetInfo(planetId);
  }, [planetId]);

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {isLoading && <Loading />}
      {!isLoading && planet && (
        <div>
          <Row>
            <Col key={planet.id} xs={12} md={6} lg={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2 className="h4">
                      <b>{planet.name}</b>
                    </h2>
                  </Card.Title>
                  <Card.Text className="h5">Attributes</Card.Text>
                  <Card.Text>
                    <b>Rotation period</b>: {planet.rotation_period}
                  </Card.Text>
                  <Card.Text>
                    <b>Orbital period</b>: {planet.orbital_period}
                  </Card.Text>
                  <Card.Text>
                    <b>Diameter</b>: {planet.diameter}
                  </Card.Text>
                  <Card.Text>
                    <b>Climate</b>: {planet.climate}
                  </Card.Text>
                  <Card.Text>
                    <b>Gravity</b>: {planet.gravity}
                  </Card.Text>
                  <Card.Text>
                    <b>Terrain</b>: {planet.terrain}
                  </Card.Text>
                  <Card.Text>
                    <b>Surface water</b>: {planet.surface_water}
                  </Card.Text>
                  <Card.Text>
                    <b>Population</b>: {planet.population}
                  </Card.Text>
                  <Card.Text className="h5">Links</Card.Text>
                  <Card.Text>
                    <b>Films</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {planet.films.map((film) => (
                      <ListGroup.Item
                        key={film.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/films/${film.id}`);
                        }}
                      >
                        <p>&gt; {film.title}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Text>
                    <b>Residents</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {planet.residents.map((resident) => (
                      <ListGroup.Item
                        key={resident.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/films/${resident.id}`);
                        }}
                      >
                        <p>&gt; {resident.name}</p>
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

export default PlanetPage;
