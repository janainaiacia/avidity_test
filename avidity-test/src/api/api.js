import axios from "axios";
import { getApiUrl } from "../utils/gitHubUtils";

export const getAccessToken = async (code) => {
  let res = await axios.get(`${getApiUrl()}/accessToken/${code}`);
  return res.data;
};
