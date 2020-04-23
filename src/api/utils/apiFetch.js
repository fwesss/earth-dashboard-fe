import axios from "axios";

const apiFetch = () =>
  axios.create({
    baseURL: "https://earthdash.herokuapp.com/api",
  });

export default apiFetch;
