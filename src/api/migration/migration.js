// eslint-disable-next-line
import axios, { AxiosResponse } from "axios";
import * as d3 from "d3";

/**
 * @typedef {object[]} Density
 * @property {number} x - x value
 * @property {number} y - top y value
 * @property {number} y0 - bottom y value
 */

/**
 * @typedef {object[]} Migration
 * @property {string} year - Year
 * @property {Density} density - Values to plot
 * @property {string} color - Color
 */

/**
 * Requests data from the Migration API and splits the response into data and all other properties
 *
 * @name migrationAPI
 * @returns {Promise<{rest: AxiosResponse<any>, data: {migration: Migration}}>} - Splits the response from the API into data and other response properties
 */
export default async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/migration_density"
  );

  const years = Object.keys(data[0]);

  const xAxis = d3.scaleLinear().domain([-10, 120]);

  /**
   * ?
   *
   * @param {function(number)} kernel - ?
   * @param {number[]} X - ?
   * @returns {function(number[]): [number, number][]} - ?
   */
  const kernelDensityEstimator = (kernel, X) => (V) =>
    X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))]);

  /**
   * ?
   *
   * @param {number} k - ?
   * @returns {function(number): number} - ?
   */
  // eslint-disable-next-line
  const kernelEpanechnikov = (k) => (v) =>
    // eslint-disable-next-line no-cond-assign,no-param-reassign
    Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;

  const kde = kernelDensityEstimator(kernelEpanechnikov(7), xAxis.ticks(40));

  const densities = years.map((year) => ({
    year,
    density: kde(data.map((d) => d[year])),
  }));

  const myColor = d3
    .scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  const means = years.map((year) => d3.mean(data, (datum) => +datum[year]));

  const cleanData = densities.map((datum, index) => ({
    ...datum,
    density: datum.density.map((d) => ({
      x: d[0],
      y: d[1] + densities.length - index * 0.03,
      y0: densities.length - index * 0.03,
    })),
    color: myColor(means[index]),
  }));

  return { data: { migration: cleanData }, rest };
};
