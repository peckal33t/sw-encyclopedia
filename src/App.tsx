import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import FilmPage from "./pages/FilmPage";
import PeoplePage from "./pages/PeoplePage";

const App = () => {
  return (
    <div>
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/films:id" element={<FilmPage />} />
          <Route path="/people" element={<PeoplePage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
