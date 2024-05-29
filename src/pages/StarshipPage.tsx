import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Starship } from "../types/Starships.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const StarshipPage = () => {
  const [starship, setStarship] = useState<SW_Starship | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const starshipId = Number(id);

  return <>StarshipPage</>;
};

export default StarshipPage;
