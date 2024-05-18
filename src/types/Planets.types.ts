export interface SW_Planets {
  id: number;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents_count: number;
  films_count: number;
}

export interface SW_PlanetsResponse {
  current_page: number;
  data: SW_Planets[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [url: string | null, label: string, active: boolean];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SW_Planet {
  id: number;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: [
    {
      id: number;
      name: string;
      birth_year: string;
      eye_color: string;
      hair_color: string;
      height: string;
      mass: string;
      skin_color: string;
    }
  ];
  films: [
    {
      id: number;
      title: string;
    }
  ];
}
