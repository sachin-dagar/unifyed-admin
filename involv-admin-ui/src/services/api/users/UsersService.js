import { apiProvider } from "../utilities/provider";

const getallendusers = async (filterAction) => {
  const response = await apiProvider.post(
    "api/user/getallendusers",
    filterAction
  );
  return response;
};

const getAllEndUserRoles = async () => {
  const response = await apiProvider.post("api/user/getAllEndUserRoles");
  return response;
};

const createEndUser = async (data) => {
  const response = await apiProvider.post("api/user/createenduser", data);
  return response;
};

const isUserIdAvailableEndUser = async (userId) => {
  const response = await apiProvider.getAll(
    `api/user/isuseridavailableforenduser?userId=${userId}`
  );
  return response;
};

export const UserService = {
  getallendusers,
  getAllEndUserRoles,
  createEndUser,
  isUserIdAvailableEndUser
};
