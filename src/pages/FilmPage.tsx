import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Film } from "../types/Films.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import NavigateButton from "../components/NavigateButton";

const FilmPage = () => {
  const [film, setFilm] = useState<SW_Film | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const filmId = Number(id);

  const getFilmInfo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getResourceById<SW_Film>("films", id);
      setFilm(data);
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
    const validResourceId = Number(filmId);
    if (!validResourceId) {
      return;
    }
    getFilmInfo(filmId);
  }, [filmId]);

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && film && (
        <div>
          <Row>
            <Col key={film.id} xs={12} md={6} lg={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2 className="h4">
                      <b>{film.title}</b>
                    </h2>
                  </Card.Title>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>
                    <b>Opening crawl</b>: {film.opening_crawl}
                  </Card.Text>
                  <Card.Title>Attributes</Card.Title>
                  <Card.Text>
                    <b>Episode</b>: {film.episode_id}
                  </Card.Text>
                  <Card.Text>
                    <b>Director</b>: {film.director}
                  </Card.Text>
                  <Card.Text>
                    <b>Producer</b>: {film.producer}
                  </Card.Text>
                  <Card.Text>
                    <b>Release date</b>: {film.release_date}
                  </Card.Text>
                  <Card.Title>Links</Card.Title>
                  <Card.Text>
                    <b>Characters</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {film.characters.map((character) => (
                      <ListGroup.Item
                        key={character.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/people/${character.id}`);
                        }}
                      >
                        <p>{character.name}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Text>
                    <b>Planets</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {film.planets.map((planet) => (
                      <ListGroup.Item
                        key={planet.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/planets/${planet.id}`);
                        }}
                      >
                        <p>{planet.name}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Text>
                    <b>Species</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {film.species.map((specie) => (
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
                    {film.starships.map((starship) => (
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
                    {film.vehicles.map((vehicle) => (
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
          <NavigateButton />
        </div>
      )}
    </>
  );
};

export default FilmPage;
