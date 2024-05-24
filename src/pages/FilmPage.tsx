import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Film } from "../types/Films.types";

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
      const data = await getResourceById<SW_Film>("/films", id);
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

  return <>FilmPage</>;
};

export default FilmPage;
