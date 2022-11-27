import axios from "axios";
import cacheData from "memory-cache";
import CharacterResponse from "../models/CharacterResponse";
import Character from "../models/Characters";
import Episode from "../models/Episode";
import EpisodeResponse from "../models/EpisodeResponse";
import Location from "../models/Location";
import LocationResponse from "../models/LocationResponse";

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
    return value;
  } else {
    try {
      const res = await RickMortyAPI.get(url);
      const data = res.data;
      // only cache valid data
      if (data) {
        cacheData.put(url, data);
      }
      return data;
    } catch (e) {
      return null;
    }
  }
}

export const getAllCharacters = async (
  page = 1,
): Promise<CharacterResponse | null> => {
  try {
    const res = await fetchWithCache(`character/?page=${page}`);
    return res;
  } catch (e) {
    return null;
  }
};

export const getCharacter = async (id: string): Promise<Character | null> => {
  try {
    const res = await fetchWithCache(`character/${id}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getCharacters = async (
  ids: string,
): Promise<Character | Character[] | null> => {
  try {
    const res = await fetchWithCache(`character/${ids}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllLocations = async (
  page = 1,
): Promise<LocationResponse | null> => {
  try {
    const res = await fetchWithCache(`location/?page=${page}`);
    return res;
  } catch (e) {
    return null;
  }
};

export const getLocation = async (
  id: string,
  includeCharacters: boolean,
): Promise<[Location | null, Character[] | null]> => {
  try {
    const res = await fetchWithCache(`location/${id}`) as Location;
    return [
      res,
      includeCharacters ? await getAssociatedCharacters(res.residents) : null,
    ];
  } catch (e) {
    console.log(e);
    return [null, null];
  }
};

export const getAllEpisodes = async (
  page = 1,
): Promise<EpisodeResponse | null> => {
  try {
    const res = await fetchWithCache(`episode/?page=${page}`);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getEpisode = async (
  id: string,
  includeCharacters: boolean,
): Promise<[Episode | null, Character[] | null]> => {
  try {
    const res = await fetchWithCache(`episode/${id}`) as Episode;

    return [
      res,
      includeCharacters ? await getAssociatedCharacters(res.characters) : null,
    ];
  } catch (e) {
    console.log(e);
    return [null, null];
  }
};

export const getAssociatedCharacters = async (
  urls: string[],
): Promise<Character[] | null> => {
  const characterIds = urls.map(
    (url) => url.replace("https://rickandmortyapi.com/api/", "").split("/")[1],
  );
  let characters: Character[] | null = [];
  if (characterIds.length > 0) {
    const c = await getCharacters(characterIds?.join(","));
    if (c && "id" in c) {
      characters = [c];
    } else {
      characters = c;
    }
  }
  return characters;
};
