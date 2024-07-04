import { apiProvider } from "../utilities/provider";

export const getGeneralProfile = async () => {
  const response = await apiProvider.getAll("api/user/profile");
  return response;
};

export const postGeneralChangePassword = async (payload) => {
  const response = await apiProvider.post(
    "api/user/resetadminpassword",
    payload
  );
  return response;
};

export const patchGeneralProfileUpdate = async (payload, id) => {
  const response = await apiProvider.patch(`api/user/profile/${id}`, payload);
  return response;
};

export const postGeneralProfileImage = async (payload) => {
  const response = await apiProvider.post(`api/user/uploadendusers`, payload);
  return response;
};
