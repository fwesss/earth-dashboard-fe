// eslint-disable-next-line
import axios, { AxiosResponse } from "axios";

/**
 * @typedef {object[]} CountryIncome
 * @property {string} incomeLevel - The income category that applies to the country
 * @property {number} x - Year
 * @property {number} y - Remaining forest area
 */

/**
 * @typedef {object[]} Country
 * @property {object} name - Country name
 * @property {number} x - Year
 * @property {number} y - Remaining forest area
 */

/**
 * Requests data from the Deforestation API and splits the response into data and all other properties
 *
 * @name deforestationAPI
 * @returns {Promise<{rest: AxiosResponse<any>, data: {countryIncome: CountryIncome, country: Country}}>} - Splits the response from the API into data and other response properties
 */
export default async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/deforestation_function"
  );

  return {
    data: {
      countryIncome: data
        .filter(
          (datum) =>
            datum["Country Code"] === "HIC" ||
            datum["Country Code"] === "MIC" ||
            datum["Country Code"] === "LIC"
        )
        .map((country) => ({
          incomeLevel: country["Country Name"],
          x: country.Year,
          y: country["Forest area (% of land area)"],
        })),
      country: data
        .filter(
          (datum) =>
            datum["Country Name"] === "Cambodia" ||
            datum["Country Name"] === "India" ||
            datum["Country Name"] === "United States of America" ||
            datum["Country Name"] === "United Kingdom" ||
            datum["Country Name"] === "Argentina" ||
            datum["Country Name"] === "Brazil"
        )
        .map((country) => ({
          name: country["Country Name"],
          x: country.Year,
          y:
            country["Forest area (% of land area)"] >= 0
              ? country["Forest area (% of land area)"]
              : 0,
        })),
    },
    rest,
  };
};
