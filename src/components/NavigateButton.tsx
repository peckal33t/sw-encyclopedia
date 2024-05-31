import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const NavigateButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(-1);
      }}
      className="custom-button-text"
      variant="dark"
    >
      &laquo; Back
    </Button>
  );
};

export default NavigateButton;
