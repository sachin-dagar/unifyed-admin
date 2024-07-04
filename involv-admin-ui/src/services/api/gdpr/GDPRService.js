import { apiProvider } from "../utilities/provider";
import { convertFilterString } from '../../../util'

export const postGDPR = (payload) => {
  return apiProvider.post("api/gdpr", payload);
};

export const patchGDPR = (payload) => {
  return apiProvider.post("api/gdpr", payload);
};

export const patchGDPRById = (id, payload) => {
  return apiProvider.patch(`api/gdpr/${id}`, payload);
};

export const getGDPR = (queryParams) => {
  return apiProvider.getAll(`api/gdpr${convertFilterString(queryParams)}`);
};

export const getGDPRById = (id) => {
  return apiProvider.getSingle(`api/gdpr`, id);
};

export const deleteGDPRById = (id) => {
  return apiProvider.remove(`api/gdpr/${id}`);
};


