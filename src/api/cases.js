import apiFetch from "./utils/apiFetch";

const requestCases = async () => {
    const { data, ...rest } = await apiFetch().get("/cases");

    return { data, rest };
};

export default { requestCases };
