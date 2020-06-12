import axios from "axios";

export default async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/summary_db_query"
  );

  return { data: { summary: data }, rest };
};
