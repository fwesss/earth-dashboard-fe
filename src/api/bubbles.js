import apiFetch from "./utils/apiFetch";

const requestSummary = async () => {
  const { data, ...rest } = await apiFetch().get("/bubbles");

  return { data, rest };
};

export default { requestSummary };
