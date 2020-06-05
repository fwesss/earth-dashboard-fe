import axios from "axios";

const requestPredictionData = async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/deforestation_function"
  );

  return { data, rest };
};

export default { requestPredictionData };
