import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.thehiveresistance.com/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getData = async <T>(endpoint: string) => {
  const res = await instance.get<T>(endpoint);
  return res.data;
};

export const getResources = async <T>(resource: string) => {
  return getData<T>(`/${resource}`);
};

export const getResourceById = async <T>(resource: string, id: number) => {
  return getData<T>(`/${resource}/${id}`);
};

export const searchResource = <T>(
  resource: string,
  query: string,
  page: number
) => {
  return getData<T>(`/${resource}/?search=${query}&page=${page}`);
};
