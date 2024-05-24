import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Film } from "../types/Films.types";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CardTitle } from "react-bootstrap";

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
                  <CardTitle>{film.title}</CardTitle>
                  <Card.Text>Director: {film.director}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default FilmPage;
