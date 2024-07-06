import axios from "axios";
import { jwtDecode } from "jwt-decode";

import dayjs from "dayjs";

const baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

let authTokens = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    let authTokens = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const user = jwtDecode(authTokens);
  console.log(user);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  console.log("refresh called");
  const response = await axios.get(`${baseURL}/api/user/refresh`, {
    withCredentials: true,
  });
  localStorage.setItem("token", JSON.stringify(response.data.accessToken));
  req.headers.Authorization = `Bearer ${response.data.accessToken}`;
  return req;
});

export default axiosInstance;
