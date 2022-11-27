import Episode from "./Episode";
import ResponseInfo from "./ResponseInfo";

interface EpisodeResponse {
  info: ResponseInfo;
  results: Episode[];
}
export default EpisodeResponse;
