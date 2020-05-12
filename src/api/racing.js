import apiFetch from "./utils/apiFetch";


const requestDeaths = async () => {
    const { data, ...rest } = await apiFetch().get("/deaths");

    return { data, rest };
};

export default { requestDeaths };