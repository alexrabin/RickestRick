// Character schema found here: https://rickandmortyapi.com/documentation#character

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string; //url
  episode: string[]; // array of urls
  url: string;
  created: string;
}

interface CharacterLocation {
  name: string;
  url: string;
}

interface CharacterOrigin {
  name: string;
  url: string;
}
export default Character;
