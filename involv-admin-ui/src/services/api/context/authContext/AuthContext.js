import React, { useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { AuthService } from "../../auth/AuthService";
import toast from "react-hot-toast";
/**
 * Auth context
 */
const AuthContext = React.createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userPermission, setUserPermission] = useState([]);
  const [token] = useLocalStorage("token", null);
  const [lSTenant] = useLocalStorage("selectedLSTenant", {});
  const [apiLoader, setApiLoader] = useState(true);
  const [route, setRoute] = useState([]);
  const [tenant, setTenant] = useState({});

  const setSelectedTenant = async (selectedTenant) => {
    try {
      if (selectedTenant?.tenant?.tenantDomain) {
        const response = await AuthService.selectTenant(
          selectedTenant?.tenant?.tenantDomain
        );
        if (response?.status === 404) {
          toast.error(response?.data?.errorMessage || "Something went wrong!");
        }
        if (response?.access_token) {
          localStorage.setItem("token", JSON.stringify(response.access_token));
          setTenant(selectedTenant);
          AuthService.setAuthHeader(response.access_token);
          const permission = await AuthService.userPermission();
          setUserPermission(permission);
        }
        setTenant(selectedTenant);
        localStorage.setItem(
          "selectedLSTenant",
          JSON.stringify(selectedTenant)
        );
        return true;
      } else {
        toast.error("Please select organisation!");
        return false;
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      if (token) {
        AuthService.setAuthHeader();
        try {
          const result = await AuthService.userprofile();
          await setSelectedTenant(lSTenant);
          if (result?.status && result?.status === 401) {
            setLoggedIn(false);
            setUserProfile({});
            setUserPermission([]);
            setApiLoader(false);
            localStorage.removeItem("token");
            localStorage.removeItem("selectedLSTenant");
            if (window.location.pathname !== "/login") {
              window.location = "/login";
            }
          } else {
            setUserProfile(result);
            setLoggedIn(true);
            setApiLoader(false);
            if (window.location.pathname === "/login") {
              window.location = "/tenant/analytics";
            }

            // if (window.location.pathname !== "/" && window.location.pathname !== "/tenantlist") {
            //   window.location = "/";
            // }
          }
        } catch (error) {
          setLoggedIn(false);
          setUserProfile({});
          setUserPermission([]);
          setApiLoader(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("selectedLSTenant");
          if (window.location.pathname !== "/login") {
            window.location = "/login";
          }
        }
      } else {
        setLoggedIn(false);
        setApiLoader(false);
        setUserProfile({});
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("selectedLSTenant");
      }
    })();
  }, [token]);

  const logout = () => {
    AuthService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedLSTenant");
    window.location = "/login";
  };

  const authContextValue = {
    loggedIn,
    userProfile,
    userPermission,
    token,
    route,
    tenant,
    setLoggedIn,
    setUserProfile,
    setUserPermission,
    apiLoader,
    logout,
    setRoute,
    setTenant: setSelectedTenant
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
