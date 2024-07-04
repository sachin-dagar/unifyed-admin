import { apiProvider } from "../utilities/provider";

const getallGadgets = async (filterAction) => {
  const response = await apiProvider.getAll(`api/gadget/list${filterAction}`);
  return response;
};

const getGadgetDetails = async (gadgetId) => {
  const response = await apiProvider.getSingle(`api/gadget/gadgetId`, gadgetId);
  return response;
};

const getAllCategories = async () => {
  const response = await apiProvider.getAll("api/gadget/category/list");
  return response;
};

const getGadgetByGadgetId = async (gadgetId) => {
  const response = await apiProvider.getSingle("api/gadget", gadgetId);
  return response;
};

const installGadget = async (gadgetDetails) => {
  const response = await apiProvider.post(
    "api/gadget/gadgetTenant",
    gadgetDetails
  );
  return response;
};

const uninstallGadget = async (gadgetId) => {
  const response = await apiProvider.remove(
    `api/gadget/gadgetTenant/${gadgetId}`
  );
  return response;
};

const updateGadgetConfig = async (_id, gadgetDetails) => {
  const response = await apiProvider.patch(
    `api/gadget/gadgetTenant/${_id}`,
    gadgetDetails
  );
  return response;
};

const getInstallGadgetDetailByGadgetId = async (gadgetId) => {
  const response = await apiProvider.getSingle(
    "api/gadget/gadgetTenant",
    gadgetId
  );
  return response;
};

const getGadgetUserPermission = async (gadgetId, tenantDomain) => {
  const response = await apiProvider.getAll(
    `api/gadget/gadgetTenantRolePermission/list?tenantDomain=${tenantDomain}&gadgetId=${gadgetId}`
  );
  return response;
};

const updateGadgetUserPermission = async (userGadgetPermision) => {
  let response = await apiProvider.post(
    `api/gadget/gadgetTenantRolePermission/list`,
    userGadgetPermision
  );
  return response;
};

const getTenantGadgetList = async (tenantId, filterAction) => {
  const response = await apiProvider.getAll(
    `api/gadget/gadgetsForTenant/${tenantId}${filterAction}`
  );
  return response;
};

export const deletePermissionRoles = async (userPermissionId) => {
  const response = await apiProvider.remove(
    `api/gadget/gadgetTenantRolePermission/${userPermissionId}`
  );
  return response;
};

export const getReviewOfAPartucularGadget = async (gadgetId, filterAction) => {
  const response = apiProvider.getAll(
    `api/gadget/review/${gadgetId}${filterAction}`
  );
  return response;
};

export const checkReviewPermission = async (gadgetId) => {
  const response = apiProvider.getAll(
    `api/gadget/review/permission/${gadgetId}`
  );
  return response;
};

export const addGadgetReview = async (data) => {
  const response = apiProvider.post(
    `api/gadget/review`, data
  );
  return response;
};

export const updateGadgetReview = async (_id, data) => {
  const response = apiProvider.patch(
    `api/gadget/review/${_id}`, data
  );
  return response;
};

export const getVersionHistoryOfGadget = async (gadgetId, queryParams) => {
  const response = apiProvider.getAll(`api/gadget/${gadgetId}/version${queryParams}`);
  return response;
};

export const GadgetService = {
  getallGadgets,
  getAllCategories,
  getGadgetDetails,
  getGadgetByGadgetId,
  installGadget,
  getGadgetUserPermission,
  getInstallGadgetDetailByGadgetId,
  updateGadgetConfig,
  updateGadgetUserPermission,
  getTenantGadgetList,
  uninstallGadget,
  getReviewOfAPartucularGadget,
  checkReviewPermission,
  addGadgetReview,
  updateGadgetReview,
  getVersionHistoryOfGadget,
};
