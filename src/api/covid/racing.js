import axios from "axios";

const requestDeaths = async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/covidall_db_query"
  );

  return { data, rest };
};

export default { requestDeaths };
