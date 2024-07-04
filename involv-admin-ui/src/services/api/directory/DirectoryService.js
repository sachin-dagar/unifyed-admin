import { apiProvider } from "../utilities/provider";

export const getDirectoryData = async (directoryId) => {
  const response = await apiProvider.getSingle(
    "api/tenantdirectory",
    directoryId
  );
  return response;
};

export const getAllDirectoryData = async (directoryId) => {
  const response = await apiProvider.getAll("api/tenantdirectory/");
  return response;
};

export const deleteDirectory = async (directoryId) => {
  const response = await apiProvider.remove(`api/tenantdirectory/${directoryId}`);
  return response;
};


export const postDirectoryData = async (payload) => {
  const response = await apiProvider.post(`api/tenantdirectory/`, payload);
  return response;
};

export const postByIdDirectoryData = async (id, payload) => {
  const response = await apiProvider.post(`api/tenantdirectory/${id}`, payload);
  return response;
};

export const postTestConnectivity = async (payload) => {
  const response = await apiProvider.post(
    `api/tenantdirectory/testconnection`,
    payload
  );
  return response;
};
