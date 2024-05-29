import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchFormProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchInput,
  setSearchInput,
  handleSubmit,
  inputRef,
}) => {
  return (
    <div>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search for film</Form.Label>
          <div className="position-relative">
            <Form.Control
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter your search"
              type="text"
              value={searchInput}
              ref={inputRef}
              className="pr-5"
            />
            <Button
              onClick={handleSubmit}
              disabled={searchInput.trim().length < 1}
              variant="outline-secondary"
              type="submit"
              className="position-absolute search-button"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchForm;
