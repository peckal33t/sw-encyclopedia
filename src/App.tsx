import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import FilmPage from "./pages/FilmPage";
import PeoplePage from "./pages/PeoplePage";
import PersonPage from "./pages/PersonPage";
import PlanetsPage from "./pages/PlanetsPage";
import PlanetPage from "./pages/PlanetPage";
import SpeciesPage from "./pages/SpeciesPage";
import SpeciePage from "./pages/SpeciePage";
import StarshipsPage from "./pages/StarshipsPage";
import StarshipPage from "./pages/StarshipPage";
import VehiclesPage from "./pages/VehiclesPage";
import VehiclePage from "./pages/VehiclePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div>
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/films/:id" element={<FilmPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:id" element={<PersonPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/planets/:id" element={<PlanetPage />} />
          <Route path="/species" element={<SpeciesPage />} />
          <Route path="/species/:id" element={<SpeciePage />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/starships/:id" element={<StarshipPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehiclePage />} />

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
