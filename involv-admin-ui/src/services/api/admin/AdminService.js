import { apiProvider } from "../utilities/provider";

export const getAdminInvite = (filter) => {
  return apiProvider.getAll(
    `api/tenant/invite/admin?pageNo=${filter?.page}&limit=${filter?.limit}&sortBy=${filter?.sortBy}&sortOrder=${filter?.sortOrder}&keyword=${filter?.keyword}&role=${filter?.role}`
  );
};

export const getAdminInviteById = (id) => {
  return apiProvider.getAll(`api/tenant/invite/admin/${id}`);
};

export const postAdminInvite = (payload) => {
  return apiProvider.post("api/tenant/invite/admin", payload);
};

export const postAdminInviteById = (id, payload) => {
  return apiProvider.patch(`api/tenant/invite/admin/${id}`, payload);
};

export const deleteAdminInviteById = (id) => {
  return apiProvider.remove(`api/tenant/invite/admin/${id}`);
};

export const verifyAdminInviteLink = (uuid) => {
  return apiProvider.getAll(`api/tenant/admin/exists/${uuid}`);
};

export const addTenantUser = (uuid, payload) => {
  return apiProvider.post(`api/tenant/invite/admin/accept/${uuid}`, payload);
};

export const verifyTenantUser = (uuid) => {
  return apiProvider.getAll(`api/tenant/invite/admin/accept/${uuid}`);
};
