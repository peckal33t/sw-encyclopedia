import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Specie } from "../types/Species.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import NavigateButton from "../components/NavigateButton";

const SpeciePage = () => {
  const [specie, setSpecie] = useState<SW_Specie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const specieId = Number(id);

  const getSpecieInfo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getResourceById<SW_Specie>("species", id);
      setSpecie(data);
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
    const validResourceId = Number(specieId);
    if (!validResourceId) {
      return;
    }
    getSpecieInfo(specieId);
  }, [specieId]);

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && specie && (
        <div>
          <Row>
            <Col key={specie.id} xs={12} md={6} lg={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2 className="h4">
                      <b>{specie.name}</b>
                    </h2>
                  </Card.Title>
                  <Card.Title>Attributes</Card.Title>
                  <Card.Text>
                    <b>Classification</b>: {specie.classification}
                  </Card.Text>
                  <Card.Text>
                    <b>Designation</b>: {specie.designation}
                  </Card.Text>
                  <Card.Text>
                    <b>Average height</b>: {specie.average_height}
                  </Card.Text>
                  <Card.Text>
                    <b>Average lifespan</b>: {specie.average_lifespan}
                  </Card.Text>
                  <Card.Text>
                    <b>Eye colors</b>: {specie.eye_colors}
                  </Card.Text>
                  <Card.Text>
                    <b>Hair colors</b>: {specie.hair_colors}
                  </Card.Text>
                  <Card.Text>
                    <b>Skin colors</b>: {specie.skin_colors}
                  </Card.Text>
                  <Card.Text>
                    <b>Language</b>: {specie.language}
                  </Card.Text>
                  <Card.Title>Links</Card.Title>
                  <Card.Text>
                    <b>Films</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {specie.films.map((film) => (
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
                    <b>People</b>
                  </Card.Text>
                  <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                    {specie.people.map((person) => (
                      <ListGroup.Item
                        key={person.id}
                        className="col-12 col-lg-4 custom-list-item click"
                        onClick={() => {
                          navigate(`/people/${person.id}`);
                        }}
                      >
                        <p>&gt; {person.name}</p>
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

export default SpeciePage;
