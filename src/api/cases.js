import axios from "axios";

const requestCases = async () => {
  const { data, ...rest } = await axios.get(
    "https://ds-backend-planetdata.herokuapp.com/covid/uscounties"
  );

  return { data, rest };
};

export default { requestCases };
