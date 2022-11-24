// Character schema found here: https://rickandmortyapi.com/documentation#character

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: any;
  image: string; //url
  episode: string[]; // array of urls
  url: string;
  created: string;
}

export default Character;
