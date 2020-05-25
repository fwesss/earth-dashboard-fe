import axios from "axios";

const requestAirData = async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/airquality_query"
  );

  return { data, rest };
};

export default { requestAirData };
