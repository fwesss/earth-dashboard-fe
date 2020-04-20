import axios from "axios";

const requestCases = async () => {
  const { data, ...rest } = await axios.get("http://localhost:3300/api/cases");

  return { data, rest };
};

export default requestCases;
