import axios from "axios";
import cacheData from "memory-cache";

const baseUrl = "https://rickandmortyapi.com/api/";
const RickMortyAPI = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "accept-encoding": "*",
  },
});

async function fetchWithCache(url: string) {
  const value = cacheData.get(url);
  if (value) {
    return { data: value };
  } else {
    try {
      const res = await RickMortyAPI.get(url);
      const data = res.data;
      // only cache valid data
      if (data) {
        cacheData.put(url, data);
      }
      return { data };
    } catch (e) {
      return { data: null };
    }
  }
}

export const getAllCharacters = async (page = 1) => {
  try {
    const res = await fetchWithCache(`character/?page=${page}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const getCharacter = async (id: string) => {
  try {
    const res = await fetchWithCache(`character/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllLocations = async (page = 1) => {
  try {
    const res = await fetchWithCache(`location/?page=${page}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const getLocation = async (id: string) => {
  try {
    const res = await fetchWithCache(`location/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllEpisodes = async (page = 1) => {
  try {
    const res = await fetchWithCache(`episode/?page=${page}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getEpisode = async (id: string) => {
  try {
    const res = await fetchWithCache(`episode/${id}`);

    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
