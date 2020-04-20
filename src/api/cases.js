import axios from "axios";

const requestCases = async () => {
  const { data, ...rest } = await axios.get(
    "https://earthdash.herokuapp.com/api/cases"
  );

  return { data, rest };
};

export default requestCases;
