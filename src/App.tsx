import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
