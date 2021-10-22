import { getEnv } from "./envUtils";

export const getClientId = () => {
  return getEnv("CLIEND_ID");
};

export const getClientSecret = () => {
  return getEnv("CLIENT_SECRET");
};

export const getLoginApiUrl = () => {
  return getEnv("API_LOGIN_URL");
};

export const getApiUrl = () => {
  return getEnv("API_URL");
};
