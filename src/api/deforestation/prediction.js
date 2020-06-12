import axios from "axios";

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
