import { apiProvider } from "../utilities/provider";
import axios from "axios";

const authenticate = async (username, password) => {
  const response = await apiProvider.post("api/auth/login", {
    username,
    password,
  });
  if (response.access_token) {
    setAuthHeader(response.access_token);
    localStorage.setItem("token", JSON.stringify(response.access_token));
  }
  return response;
};

const userprofile = async () => {
  const response = await apiProvider.getAll("api/auth/userprofile");
  if (response) {
    localStorage.setItem("user", JSON.stringify(response));
  }
  return response;
};

const userPermission = async () => {
  const response = await apiProvider.getAll("api/permission/mypermissions");
  return response;
};

const setAuthHeader = (token = null) => {
  if (!token) {
    token = JSON.parse(localStorage.getItem("token"));
  }
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const logout = async () => {
  const response = await apiProvider.post("api/auth/logout");
  delete axios.defaults.headers.common["Authorization"];
  return response;
};

const selectTenant = async (seletedDomain) => {
  const response = await apiProvider.post(`api/auth/selecttenant?seletedDomain=${seletedDomain}`);
  return response;
};


export const AuthService = {
  authenticate,
  userprofile,
  setAuthHeader,
  userPermission,
  logout,
  selectTenant
};
