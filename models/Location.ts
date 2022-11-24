// Location schema can be found here: https://rickandmortyapi.com/documentation#location
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // list of character urls
  url: string[]; // link to the locations own endpoint
  created: string; // data the location was created in the database
}
export default Location;
