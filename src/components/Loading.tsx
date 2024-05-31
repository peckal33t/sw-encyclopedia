import { StageSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <StageSpinner size={50} loading={true} sizeUnit={"px"} color="#ffff00" />
    </div>
  );
};

export default Loading;
