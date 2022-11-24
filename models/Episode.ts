// Episode Scheme found here https://rickandmortyapi.com/documentation#episode
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // array of character urls
  url: string; // link to the episode endpoint
  created: string; // time as which the episode was created in the database
}

export default Episode;
