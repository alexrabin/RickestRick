import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const baseUrl = "https://rickandmortyapi.com/api/";
const RickMortyAPI = setupCache(axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "accept-encoding": "*",
  },
}));

export const getAllCharacters = async (page = 1) => {
  try {
    const res = await RickMortyAPI.get(`character/?page=${page}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const getCharacter = async (id: string) => {
  try {
    const res = await RickMortyAPI.get(`character/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllLocations = async (page = 1) => {
  try {
    const res = await RickMortyAPI.get(`location/?page=${page}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const getLocation = async (id: string) => {
  try {
    const res = await RickMortyAPI.get(`location/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllEpisodes = async (page = 1) => {
  try {
    const res = await RickMortyAPI.get(`episode/?page=${page}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getEpisode = async (id: string) => {
  try {
    const res = await RickMortyAPI.get(`episode/${id}`);

    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
