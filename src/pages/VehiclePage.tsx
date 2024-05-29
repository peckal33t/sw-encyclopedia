import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../services/API";
import { SW_Vehicle } from "../types/Vehicles.types";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const VehiclePage = () => {
  const [vehicle, setVehicle] = useState<SW_Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const vehicleId = Number(id);

  return <>VehiclePage</>;
};

export default VehiclePage;
