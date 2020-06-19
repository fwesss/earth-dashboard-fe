// eslint-disable-next-line
import axios, { AxiosResponse } from "axios";
import GeoJSON from "geojson";

/**
 * @typedef {string[]} HeatmapDates - A set of all dates with cases in
 *   "MM-DD-YY" format
 */

/**
 * @typedef {object[]} Cases - A geojson object holding all data needed to render
 *   the heatmap with mapbox
 * @property {"FeatureCollection"} type - The geojson type
 * @property {{type: "FeatureCollection", geometry: {type: "Feature", coordinates: [number, number]}, properties: {cases: number, date: {string}}}[]} features - A collection of all data points grouped by date and location
 */

/**
 * Requests data from the Heatmap API and splits the response into data and all
 * other properties
 *
 * @name heatmapAPI
 * @returns {Promise<{rest: AxiosResponse<any>, data: {cases: Cases, dates:
 *   HeatmapDates}}>} - Splits the response from the API into data and other response properties
 */
export default async () => {
  const { data, ...rest } = await axios.get(
    "https://ds-backend-planetdata.herokuapp.com/covid/uscounties/query"
  );

  const cases = GeoJSON.parse(data.cases, {
    Point: ["lat", "lon"],
  });

  const { dates } = data;

  return { data: { cases, dates }, rest };
};
