// eslint-disable-next-line
import axios, { AxiosResponse } from "axios";

/**
 *
 * @typedef {object[]} Summary
 * @property {string} country - Country name
 * @property {number} totalconfirmed - Total confirmed cases of COVID-19
 */

/**
 * Requests data from the Bubbles API and splits the response into data and all other properties
 *
 * @name bubblesAPI
 * @returns {Promise<{rest: AxiosResponse<any>, data: {summary: Summary}}>} - Splits the response from the API into data and other response properties
 */
export default async () => {
  const { data, ...rest } = await axios.get(
    "https://p4vg4pibx5.execute-api.us-east-1.amazonaws.com/default/bubblesdata"
  );

  return { data: { summary: data }, rest };
};
