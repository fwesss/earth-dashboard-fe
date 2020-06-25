import {
  createSlice,
  // eslint-disable-next-line
  CaseReducerActions,
  // eslint-disable-next-line
  ThunkDispatch,
} from "@reduxjs/toolkit";
import bubbles from "../../api/covid/bubbles";
import racing from "../../api/covid/racing";
import airQuality from "../../api/covid/airQuality";
import heatmap from "../../api/covid/heatmap";
import deforestation from "../../api/deforestation/prediction";
import migration from "../../api/migration/migration";

/**
 * The initial state of a visualization
 *
 * @typedef {object} InitialState
 * @property {boolean} fetching - Flag to indicate data is currently being
 *   fetched.
 * @property {?object} success - After a successful fetch, non-response
 *   data is added here
 * @property {?object} error - After an unsuccessful fetch, error data
 *   is added here
 * @property {object} data - All data necessary to render a visualization is
 *   stored here after a successful fetch
 */

/**
 * The updated state of a visualization
 *
 * @typedef {InitialState} NewState
 */

/**
 *  Builds the initial state for a visualization.
 *
 *  @function
 *  @param {object} initialData - Visualization specific data that should be
 *   stored in redux.
 *  @returns {InitialState} - Visualization specific data that should be
 */
const initialStateBuilder = (initialData) => ({
  fetching: false,
  success: null,
  error: null,
  data: {
    ...initialData,
  },
});

/**
 * @typedef {object} Action
 * @property {string} payload - Redux action data
 * @property {string} type - Redux action type
 */

/**
 * State of the visualization while data is being fetched
 *
 * @typedef {Function} FetchingData
 * @param {InitialState} state
 * @returns {NewState}
 */

/**
 * State of the visualization after data has been successfully fetched
 *
 * @typedef {Function} FetchingDataSuccess
 * @param {InitialState} state
 * @param {Action} action
 * @returns {NewState}
 */

/**
 * State of the visualization after a fetch has Incorrect
 *
 * @typedef {Function} FetchingDataError
 * @param {InitialState} state
 * @param {Action} action
 * @returns {NewState}
 */

/**
 * Reducers for fetching data and storing it in the redux store
 *
 * @namespace
 * @property {FetchingData} fetchingData - Switches visualization state to fetching
 * @property {FetchingDataSuccess} fetchingDataSuccess - Switches visualization state to success
 * @property {FetchingDataError} fetchingDataError - Switches visualization state to error
 */
const fetchingReducers = {
  /**
   * @param {InitialState} state - Current visualization state
   * @returns {NewState} - New visualization state
   */
  fetchingData(state) {
    return {
      ...state,
      fetching: true,
      success: null,
      error: null,
    };
  },

  /**
   * @param {InitialState} state - Current visualization state
   * @param {Action} action - Action to temperature state
   * @returns {NewState} - New visualization state
   */
  fetchingDataSuccess(state, action) {
    const { data, rest } = JSON.parse(action.payload);

    return {
      ...state,
      fetching: false,
      success: rest,
      data,
      error: null,
    };
  },

  /**
   * @param {InitialState} state - Current visualization state
   * @param {Action} action - Action to temperature state
   * @returns {NewState} - New visualization state
   */
  fetchingDataError(state, action) {
    return {
      ...state,
      fetching: false,
      error: JSON.parse(action.payload),
      success: null,
    };
  },
};

/**
 * Function for retrieving data from API to be used in the visualization
 *
 * @param {Function} requestData - Data retrieval and manipulation function
 * @param {CaseReducerActions} actions - Redux actions for the visualization
 * @returns {function(): function(ThunkDispatch)} - Asynchronously fetches data need for visualization and either dipatches a success or error action with the API response
 */
const getData = (requestData, actions) => () => async (dispatch) => {
  dispatch(actions.fetchingData());
  try {
    dispatch(actions.fetchingDataSuccess(JSON.stringify(await requestData())));
  } catch (fetchError) {
    dispatch(actions.fetchingDataError(JSON.stringify(fetchError)));
  }
};

/**
 * @typedef {object} VisSlice
 * @property {createSlice} slice - Redux actions and reducers
 * @property {InitialState} initialState - Initial state of visualization
 * @property {Function} getData - Method to call API
 * @property {Function} fetching - Returns the fetching property of state
 * @property {Function} success - Returns the success property of state
 * @property {Function} error - Returns the error property of state
 * @property {Function} data - Returns the data property of state
 */

/**
 * Builds a slice of state for a visualization. Also attaches the data fetch method, and actions to the visualization object.
 *
 * @param {string} name - Name of the visualization.
 * @param {object} initialData - Data necessary to render the visualization.
 * @returns {VisSlice} - Everything needed to automatically create tests, add to navigation and routes, and state to render the visualization
 */
const sliceBuilder = (name, initialData) => ({
  slice: createSlice({
    name,
    initialState: initialStateBuilder(initialData),
    reducers: fetchingReducers,
  }),
  initialState: initialStateBuilder(initialData),
  getData,
  fetching: (state) => state[name].fetching,
  success: (state) => state[name].success,
  error: (state) => state[name].error,
  data: (state) => state[name].data,
});

/**
 * The Visualization object holds the data necessary to automatically add a visualization page to the app, NavBar,
 * and routes. A test is automatically written for the redux actions and state, and integration tests are written
 * for the page based on the data stored in this object.
 *
 * @typedef {object} Visualization
 * @property {string} name - The name of the visualization
 * @property {string} displayName - The name of the visualization as it should display in the NavBar
 * @property {string} topic - The topic of the visualization as it should display in the NavBar
 * @property {string} path - The path from the visualizations folder of the component exporting the visualization
 * @property {?object} initialData - The object that will hold visualization state required to render
 * @property {?Function} fetchMethod - The function called to retrieve data from the API
 * @property {?object} minTestData - The minimum required data to render a visualization. Tests will be automatically run using this data to render a test visualization.
 * @property {Function} component - The component exporting the visualization page
 */

/**
 * @type {Visualization[]}
 * @namespace
 */
export const visualizations = [
  {
    name: "globalCases",
    displayName: "Global Cases",
    topic: "Pandemic",
    path: "/covid/bubbles/BubblesVis",
    initialData: {
      summary: null,
    },
    fetchMethod: bubbles,
    minTestData: {
      summary: [
        {
          country: "United States",
          totalconfirmed: 1234567,
        },
        {
          country: "Spain",
          totalconfirmed: 65768,
        },
      ],
    },
  },
  {
    name: "globalFatalities",
    displayName: "Global Fatalities",
    topic: "Pandemic",
    path: "/covid/racing/RacingData",
    initialData: {
      deaths: null,
    },
    fetchMethod: racing,
    minTestData: {
      deaths: [
        {
          country: "China",
          date: "2020-01-22T08:00:00.000Z",
          deaths: 17,
          color: "#fb8072",
        },
      ],
    },
  },
  {
    name: "airQualityEffect",
    displayName: "Air Quality Effect",
    topic: "Pandemic",
    path: "/covid/air/AirVis",
    initialData: {
      dates: null,
      airQuality: null,
      cases: null,
    },
    fetchMethod: airQuality,
    minTestData: {
      dates: ["4/26/2020", "4/27/2020"],
      airQuality: [
        {
          x: "4/26/2020",
          y: 13.5,
        },
        {
          x: "4/27/2020",
          y: 15.7,
        },
      ],
      cases: [
        {
          x: "4/26/2020",
          y: 19567,
        },
        {
          x: "4/27/2020",
          y: 20460,
        },
      ],
    },
  },
  {
    name: "usCases",
    displayName: "US Cases",
    topic: "Pandemic",
    path: "/covid/cases/CasesVis",
    initialData: {
      cases: null,
      dates: [null, null],
    },
    fetchMethod: heatmap,
    minTestData: {
      dates: ["01-22-20", "01-23-20"],
      cases: {
        features: [
          {
            geometry: {
              coordinates: [-121.83, 47.49],
              type: "Point",
            },
            properties: {
              cases: 1,
              date: "2020-01-22",
            },
            type: "Feature",
          },
          {
            geometry: {
              coordinates: [-121.83, 47.49],
              type: "Point",
            },
            properties: {
              cases: 1,
              date: "2020-01-23",
            },
            type: "Feature",
          },
        ],
        type: "FeatureCollection",
      },
    },
  },
  {
    name: "country",
    displayName: "By Country",
    topic: "Deforestation",
    path: "/deforestation/country/CountryVis",
    initialData: {
      countryIncome: null,
      country: null,
    },
    fetchMethod: deforestation,
    minTestData: {
      country: [
        {
          name: "Argentina",
          x: 1990,
          y: 12.7135335022,
        },
      ],
    },
  },
  {
    name: "countryIncome",
    displayName: "By Country Income",
    topic: "Deforestation",
    path: "/deforestation/income/CountryIncomeVis",
    initialData: {
      countryIncome: null,
      country: null,
    },
    fetchMethod: deforestation,
    minTestData: {
      countryIncome: [
        {
          incomeLevel: "High Income Countries",
          x: 1990,
          y: 28.4507844367,
        },
      ],
    },
  },
  {
    name: "pattern",
    displayName: "Migration",
    topic: "Wildlife",
    path: "/migration/pattern/Migration",
    initialData: {
      migration: null,
    },
    fetchMethod: migration,
    minTestData: {
      migration: [
        {
          year: "1970",
          density: [
            {
              x: -10,
              y: 9,
              y0: 9,
            },
          ],
          color: "rgb(84, 101, 214)",
        },
      ],
    },
  },
  {
    name: "carbonDioxide",
    displayName: "Carbon Dioxide",
    topic: "Climate",
    path: "/climate/carbonDioxide/CarbonDioxide",
  },
  {
    name: "summary",
    displayName: "Summary",
    topic: "Climate",
    path: "/climate/temperature/Temperature",
  },
  {
    name: "symbiosis",
    displayName: "Symbiosis",
    topic: "Wildlife",
    path: "/migration/symbiosis/Symbiosis",
  },
];

/**
 * An array of all visualizations, their redux slices, and methods for handling data
 *
 * @type {VisSlice[]}
 */
export const slices = visualizations.map(({ name, initialData }) =>
  sliceBuilder(name, initialData)
);

/**
 * An object containing all visSlices and preloading the getData function with the visualization's
 * fetch method and redux actions.
 *
 * @type {object.<string, VisSlice>}
 */
export const visStates = Object.fromEntries(
  Object.entries({
    ...slices,
  }).map(([key, val], index) => [
    visualizations[+key].name,
    {
      ...val,
      getData: getData(visualizations[index].fetchMethod, val.slice.actions),
    },
  ])
);

/**
 * Reducer creators for visualizations. Exported for inclusion with other reducers passed to combineReducers.
 *
 * @type {object<string, Function>}
 */
export const visualizationReducers = Object.fromEntries(
  Object.entries({
    ...slices.map((vis) => vis.slice.reducer),
  }).map(([key, val]) => [`${visualizations[+key].name}Reducer`, val])
);
