import { apiProvider } from "../utilities/provider";

export const getallSecurityData = async () => {
  const response = await apiProvider.getAll(`api/securityconfig`);
  return response;
};

export const patchSecurityData = async (id, payload) => {
  const response = await apiProvider.patch(`api/securityconfig/${id}`, payload);
  return response;
};
