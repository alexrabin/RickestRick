import Character from "./Characters";
import ResponseInfo from "./ResponseInfo";

interface CharacterResponse {
  info: ResponseInfo;
  results: Character[];
}
export default CharacterResponse;
