import axios from "axios";
import { schemeSet3 } from "d3";

export default async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/covidall_db_query"
  );

  /*
   * For visual clarity, each country should have a persistent color. While the bars are switching around, it's easier
   * to follow a specific country by tracking it's color rather than text label alone.
   *
   * The rest of the visualizations are using colors from D3 schemeSet3[]. For app cohesion, we want this graph to utilize
   * those same colors.
   *
   * We need to assign a color from schemeSet3 to each country. To tie a color to a country, we can hash the name of the
   * country and use that as an index to access a color from schemeSet3[]. Because hashString returns the same output each
   * time it runs with the same input, we'll always get the same color for a country.
   *
   * The result is our data array except a color property has been added to each object.
   */
  const hashString = (input) =>
    [...input]
      .map((character) => character.charCodeAt(0))
      .reduce((accumulator, currentValue) => accumulator + currentValue) %
    schemeSet3.length;

  return {
    data: {
      deaths: data.map((x) => ({
        ...x,
        date: new Date(
          x.date.substring(0, 4),
          x.date.substring(5, 7) - 1,
          x.date.substring(8, 10)
        ),
        color: schemeSet3[hashString(x.country)],
      })),
    },
    rest,
  };
};
