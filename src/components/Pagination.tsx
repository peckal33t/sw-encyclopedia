import React from "react";
import Button from "react-bootstrap/Button";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Button
        className="custom-button-text"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="dark"
      >
        Previous page
      </Button>
      <span>{`Page ${currentPage} of ${lastPage}`}</span>
      <Button
        className="custom-button-text"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        variant="dark"
      >
        Next page
      </Button>
    </div>
  );
};

export default Pagination;
