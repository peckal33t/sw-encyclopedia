import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Film } from "../types/Films.types";

const FilmPage = () => {
  const [film, setFilm] = useState<SW_Film | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  return <>FilmPage</>;
};

export default FilmPage;
