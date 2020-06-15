import axios from "axios";
import GeoJSON from "geojson";

export default async () => {
  const { data, ...rest } = await axios.get(
    "https://ds-backend-planetdata.herokuapp.com/covid/uscounties"
  );

  const cases = GeoJSON.parse(data.cases, {
    Point: ["lat", "lon"],
  });

  const { dates } = data;

  return { data: { cases, dates }, rest };
};
