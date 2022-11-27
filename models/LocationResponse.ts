import Location from "./Location";
import ResponseInfo from "./ResponseInfo";

interface LocationResponse {
  info: ResponseInfo;
  results: Location[];
}
export default LocationResponse;
