import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.thehiveresistance.com/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const FAKE_DELAY = 1000;

export const getData = async <T>(endpoint: string) => {
  const res = await instance.get<T>(endpoint);
  await new Promise((r) => setTimeout(r, FAKE_DELAY));
  return res.data;
};

export const getResources = async <T>(resource: string, page: number) => {
  await new Promise((r) => setTimeout(r, FAKE_DELAY));
  return getData<T>(`/${resource}?page=${page}`);
};

export const getResourceById = async <T>(resource: string, id: number) => {
  await new Promise((r) => setTimeout(r, FAKE_DELAY));
  return getData<T>(`/${resource}/${id}`);
};

export const searchResource = async <T>(
  resource: string,
  query: string,
  page: number
) => {
  await new Promise((r) => setTimeout(r, FAKE_DELAY));
  return getData<T>(`/${resource}/?search=${query}&page=${page}`);
};
