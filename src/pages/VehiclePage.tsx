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

  const getVehicleInfo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getResourceById<SW_Vehicle>("vehicles", id);
      setVehicle(data);
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
    const validResourceId = Number(vehicleId);
    if (!validResourceId) {
      return;
    }
    getVehicleInfo(vehicleId);
  }, [vehicleId]);

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && vehicle && (
        <div>
          <Row>
            <Col key={vehicle.id} xs={12} md={6} lg={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2 className="h4">
                      <b>{vehicle.name}</b>
                    </h2>
                  </Card.Title>
                  <Card.Title>Attributes</Card.Title>
                  <Card.Text>
                    <b>Model</b>: {vehicle.model}
                  </Card.Text>
                  <Card.Text>
                    <b>Vehicle class</b>: {vehicle.vehicle_class}
                  </Card.Text>
                  <Card.Text>
                    <b>Manufacturer</b>: {vehicle.manufacturer}
                  </Card.Text>
                  <Card.Text>
                    <b>Length</b>: {vehicle.length}
                  </Card.Text>
                  <Card.Text>
                    <b>Cost in credits</b>: {vehicle.cost_in_credits}
                  </Card.Text>
                  <Card.Text>
                    <b>Crew</b>: {vehicle.crew}
                  </Card.Text>
                  <Card.Text>
                    <b>Passengers</b>: {vehicle.passengers}
                  </Card.Text>
                  <Card.Text>
                    <b>Max atmosphering speed</b>:{" "}
                    {vehicle.max_atmosphering_speed} km/h
                  </Card.Text>
                  <Card.Text>
                    <b>Cargo capacity</b>: {vehicle.cargo_capacity}
                  </Card.Text>
                  <Card.Text>
                    <b>Consumables</b>: {vehicle.consumables}
                  </Card.Text>
                  <Card.Title>Links</Card.Title>
                  <Card.Text>
                    <b>Pilots</b>
                  </Card.Text>
                  <Card.Text>
                    <b>Films</b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default VehiclePage;
