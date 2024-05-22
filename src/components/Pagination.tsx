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
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous page
      </Button>
      <span>{`Page ${currentPage} of ${lastPage}`}</span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next page
      </Button>
    </div>
  );
};

export default Pagination;
