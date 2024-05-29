import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Person } from "../types/People.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";

const PersonPage = () => {
  const [person, setPerson] = useState<SW_Person | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const personId = Number(id);

  const getPersonInfo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getResourceById<SW_Person>("people", id);
      setPerson(data);
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
    const validResourceId = Number(personId);
    if (!validResourceId) {
      return;
    }
    getPersonInfo(personId);
  }, [personId]);

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && person && (
        <div>
          <Row>
            <Col key={person.id} xs={12} md={6} lg={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2 className="h4">
                      <b>{person.name}</b>
                    </h2>
                  </Card.Title>
                  <Card.Title>Attributes</Card.Title>
                  <Card.Text>
                    <b>Birth year</b>: {person.birth_year}
                  </Card.Text>
                  <Card.Text>
                    <b>Eye color</b>: {person.eye_color}
                  </Card.Text>
                  <Card.Text>
                    <b>Hair color</b>: {person.hair_color}
                  </Card.Text>
                  <Card.Text>
                    <b>Height</b>: {person.height}
                  </Card.Text>
                  <Card.Text>
                    <b>Mass</b>: {person.mass}
                  </Card.Text>
                  <Card.Text>
                    <b>Skin color</b>: {person.skin_color}
                  </Card.Text>
                  <Card.Title>Links</Card.Title>
                  <Card.Text>
                    <b>Films</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {person.films.map((film) => (
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
                  <Card.Text>
                    <b>Species</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {person.species.map((specie) => (
                      <ListGroup.Item
                        key={specie.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/species/${specie.id}`);
                        }}
                      >
                        <p>{specie.name}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Text>
                    <b>Starships</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {person.starships.map((starship) => (
                      <ListGroup.Item
                        key={starship.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/starships/${starship.id}`);
                        }}
                      >
                        <p>{starship.name}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Text>
                    <b>Vehicles</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {person.vehicles.map((vehicle) => (
                      <ListGroup.Item
                        key={vehicle.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/vehicles/${vehicle.id}`);
                        }}
                      >
                        <p>{vehicle.name}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default PersonPage;
