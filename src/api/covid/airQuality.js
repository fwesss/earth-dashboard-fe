// eslint-disable-next-line
import axios, { AxiosResponse } from "axios";

/**
 * @typedef {object[]} AirQuality
 * @property {string} x - The date of measurement in "M/DD/YYYY" format
 * @property {number} y - Air quality measurement
 */

/**
 * @typedef {string[]} AirQualityDates - All dates in common between cases and air quality data in "M/DD/YYYY" format
 */

/**
 * @typedef {object[]} Cases
 * @property {string} x - The date of measurement in "M/DD/YYYY" format
 * @property {number} y - Number of cases that day
 */

/**
 * Requests data from the airQuality API and splits the response into data and all other properties
 *
 * @name airQualityResponse
 * @returns {Promise<{rest: AxiosResponse<any>, data: {airQuality: AirQuality, cases: Cases, dates: AirQualityDates}}>} - Splits the response from the API into data and other response properties
 */
export default async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/airquality_query"
  );

  return {
    data: { dates: data.dates, airQuality: data.airQuality, cases: data.cases },
    rest,
  };
};
