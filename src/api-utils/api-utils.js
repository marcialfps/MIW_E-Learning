import axios from "axios";

export const login = async (username) => {
  const loginResponse = await axios.get(
    "https://rb5cc5m3dk.execute-api.us-east-2.amazonaws.com/default/avai-api",
    {
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        username: username,
      },
    }
  );
  return loginResponse;
};

export const register = async (username, birth, knowledge) => {
  const registerResponse = await axios({
    method: "post",
    url:
      "https://rb5cc5m3dk.execute-api.us-east-2.amazonaws.com/default/avai-api",
    data: {
      type: "register",
      username,
      birth,
      knowledge,
    },
  });
  return registerResponse;
};

export const save = async (username, day, points, time, clicks) => {
  const saveResponse = await axios({
    method: "post",
    url:
      "https://rb5cc5m3dk.execute-api.us-east-2.amazonaws.com/default/avai-api",
    data: {
      username,
      day,
      points,
      time,
      clicks,
    },
  });
  return saveResponse;
};
