import apiFetch from "./utils/apiFetch";

const requestAirData = async () => {
  const { data, ...rest } = await apiFetch().get("/air");

  return { data, rest };
};

export default { requestAirData };
