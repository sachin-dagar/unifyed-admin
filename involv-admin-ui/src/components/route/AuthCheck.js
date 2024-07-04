import { isEmpty } from "lodash";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuth } from "../../services/api/context/authContext/AuthContext";
import { getAllModuleName } from "../../util";

function AuthCheck({ children }) {
  const { loggedIn, userPermission, route, tenant } = useAuth();
  const location = useLocation();
  const absolutePath = location?.pathname;
  const allModuleRoute = getAllModuleName(route);
  const [lSTenant] = useLocalStorage("selectedLSTenant", {});
  const currentModule = allModuleRoute?.find(
    (item) => item?.activeUrl === absolutePath
  );

  if (loggedIn && absolutePath !== "/tenantlist" && isEmpty(tenant) && isEmpty(lSTenant)) {
    return <Navigate to="/tenantlist" />
  }

  if (currentModule?.authCheckNotRequired || currentModule === undefined)  {
    return children;
  }

  if (loggedIn) {
    const pathModule = absolutePath?.split("/");
    const isPermission = userPermission?.find(
      (item) => currentModule?.mouldeName === item.subModuleName  && item?.permissionDetail?.canRead
    );

    if (pathModule?.length > 1) {
      pathModule?.pop();
    }

    pathModule?.push("permission-denied");
    const exactPath = pathModule?.join("/");
    if (
      !isPermission &&
      exactPath !== absolutePath &&
      userPermission &&
      absolutePath !== "/tenantlist" &&
      absolutePath !== "/"
    ) {
      return <Navigate to={exactPath} />;
    }
    return children;
  } else if (absolutePath !== "/login" && absolutePath !== "/") {
    return <Navigate to="/login" />;
  }
  return null;
}

export default AuthCheck;
