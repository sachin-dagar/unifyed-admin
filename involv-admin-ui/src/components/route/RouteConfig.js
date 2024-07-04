import React, { useEffect } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Outlet, useRoutes } from "react-router";
import { useAuth } from "../../services/api/context/authContext/AuthContext";
import InvolvLogin from "../auth/InvolvLogin";
import InvolvSignUp from "../auth/InvolvSignUp";
import InvolvTenantAdminLanding from "../InvolvTenantAdminLanding";
import InvolvTenantListing from "../InvolvTenantListing";
import InvolvTenantAnalytics from "../pages/analytics/InvolvTenantAnalytics";
import InvolvTenantDashboard from "../pages/dashboard/InvolvTenantDashboard";
import InvolvTenantGadgets from "../pages/gadgets/InvolvTenantGadgets";
import InvolvTenantGadgetsEvent from "../pages/gadgets/InvolvTenantGadgetsEvent";
import InvolvTenantGadgetsInstall from "../pages/gadgets/InvolvTenantGadgetsInstall";
import InvolvTenantGadgetsList from "../pages/gadgets/InvolvTenantGadgetsList";
import InvolvAdminLanding from "../pages/home/InvolvAdminLanding";
import InvolvGadgetsLanding from "../pages/home/InvolvGadgetsLanding";
import InvolvGadgetPreview from "../pages/gadgets/InvolvGadgetPreview";
import NotFound from "../pages/NotFound";
import PermissionDenied from "../pages/PermissionDenied";
import InvolvTenantSettings from "../pages/settings/InvolvTenantSettings";
import InvolvTenantSettingsAdmins from "../pages/settings/InvolvTenantSettingsAdmins";
import InvolvTenantSettingsGeneral from "../pages/settings/InvolvTenantSettingsGeneral";
import InvolvTenantSettingsList from "../pages/settings/InvolvTenantSettingsList";
import InvolvTenantUsers from "../pages/users/InvolvTenantUsers";
import AuthCheck from "./AuthCheck";
import { isEmpty } from "lodash";
import InvolvTenantDirectoryList from "../pages/settings/directory/InvolvTenantDirectoryList";
import InvolvTenantDirectoryConfig from "../pages/settings/directory/InvolvTenantDirectoryConfig";
import InvolvTenantSecurity from "../pages/settings/InvolvTenantSecurity";
import EmailVerification from "../auth/EmailVerification";
import SetUpPassword from "../auth/SetUpPassword";
import ForgotPassword from "../auth/ForgotPassword";
import InvolvInviteAdmin from "../auth/InvolvInviteAdmin";
import ForgotPasswordEmailVerification from "../auth/ForgotPasswordEmailVerification";
import ResetPassword from "../auth/ResetPassword";
import InvolvBranding from "../pages/branding/InvolvBranding";
import GadgetList from "../pages/gadgets/gadgetConfigure/GadgetList";
import GadgetConfigure from "../pages/gadgets/gadgetConfigure/GadgetConfigure";
import GadgetBasic from "../pages/gadgets/gadgetConfigure/GadgetBasic";
import GadgetConfigrutation from "../pages/gadgets/gadgetConfigure/dragAndDrop/GadgetConfigrutation";
import InvolvTenantAdminForm from "../pages/settings/Admin/InvolvTenantAdminForm";
import InvolvAdminPublicHome from "../pages/public/publicHome/InvolvAdminPublicHome";
import InvolvComingSoon from "../shared/InvolvComingSoon";
import InvolveAdminWhyUnite from "../pages/public/whyUnite/InvolveAdminWhyUnite";
import InvolvTosListing from "../pages/settings/Gdpr/InvolvTosListing";
import InvolvTosForm from "../pages/settings/Gdpr/InvolvTosForm";
import InvolvScholarHub from "../pages/public/scholarHub/InvolvScholarHub";
import InvolvAdminMentorHub from "../pages/public/mentorHub/InvolvAdminMentorHub";
import InvolvSolutions from "../pages/public/solutions/InvolvSolutions";
import InvolvAboutUs from "../pages/public/about-us/InvolvAboutUs";
import InvolvMobile from "../pages/public/mobile/InvolvMobile";
import InvolvResources from "../pages/public/resources/InvolvResources";
import InvolvInstituteDetails from "../pages/settings/InvolvInstituteDetails";
import InvolveTrustCenter from "../pages/public/trustCenter/InvolveTrustCenter";

export const RouteConfig = () => {
  const routes = [
    // {
    //   path: "/",
    //   moduleName: "landing-page",
    //   element: <InvolvAdminLanding />,
    //   authCheckNotRequired: true,
    // },
    {
      path: "/",
      moduleName: "landing-page",
      element: <InvolvAdminPublicHome />,
      authCheckNotRequired: true,
    },
    {
      path: "/gadget",
      moduleName: "gadgets-landing-page",
      element: <InvolvGadgetsLanding />,
      authCheckNotRequired: true,
    },
    {
      path: "/gadget/:gadgetId",
      moduleName: "gadgets-preview-page",
      element: <InvolvGadgetPreview />,
      authCheckNotRequired: true,
    },
    {
      path: "*",
      moduleName: "not-found",
      element: <NotFound />,
      authCheckNotRequired: true,
    },
    {
      path: "/login",
      moduleName: "login",
      element: <InvolvLogin />,
      authCheckNotRequired: true,
    },
    {
      path: "/signup",
      moduleName: "signup",
      element: <InvolvSignUp />,
      authCheckNotRequired: true,
    },
    {
      path: "/verify-invite-admin",
      moduleName: "verify-invite-admin",
      element: <InvolvInviteAdmin />,
      authCheckNotRequired: true,
    },
    {
      path: "/password",
      moduleName: "password",
      element: <SetUpPassword />,
      authCheckNotRequired: true,
    },
    {
      path: "/email-verification",
      moduleName: "email-verification",
      element: <EmailVerification />,
      authCheckNotRequired: true,
    },
    {
      path: "/forgot-password",
      moduleName: "forgot-password",
      element: <ForgotPassword />,
      authCheckNotRequired: true,
    },
    {
      path: "/forgot-verification",
      moduleName: "forgot-verification",
      element: <ForgotPasswordEmailVerification />,
      authCheckNotRequired: true,
    },
    {
      path: "/reset-password",
      moduleName: "reset-password",
      element: <ResetPassword />,
      authCheckNotRequired: true,
    },
    {
      path: "/permission-denied",
      moduleName: "tenant-list",
      element: <PermissionDenied />,
      authCheckNotRequired: true,
    },
    {
      path: "/tenantlist",
      moduleName: "tenant-list",
      element: <InvolvTenantListing />,
    },
    {
      path: "/tenant",
      moduleName: "Tenant",
      element: <InvolvTenantAdminLanding />,
      children: [
        {
          path: "dashboard",
          moduleName: "dashboard",
          element: <InvolvTenantDashboard />,
        },
        {
          path: "users",
          moduleName: "user",
          element: <InvolvTenantUsers />,
        },
        {
          path: "gadgets",
          moduleName: "gadget",
          element: <InvolvTenantGadgets />,
          children: [
            {
              path: "",
              moduleName: "gadget",
              element: <InvolvTenantGadgetsList />,
            },
            {
              path: "list",
              moduleName: "gadget",
              element: <InvolvTenantGadgetsList />,
            },
            {
              path: "install/:gadgetName/:gadgetId",
              moduleName: "gadget",
              element: <InvolvTenantGadgetsInstall />,
            },
            {
              path: ":gadgetName/:gadgetId",
              moduleName: "gadget",
              element: <InvolvTenantGadgetsEvent />,
            },
            { path: "permission-denied", element: <PermissionDenied /> },
          ],
        },
        {
          path: "config/gadgets-list",
          moduleName: "Invite Admin",
          element: <GadgetList />,
        },
        {
          path: "config/add-gadgets",
          moduleName: "Invite Admin",
          element: <GadgetConfigure />,
          children: [
            {
              path: "",
              moduleName: "Invite Admin",
              element: <GadgetBasic />,
            },
            {
              path: "gadgets-configrutation",
              moduleName: "Invite Admin",
              element: <GadgetConfigrutation />,
            },
          ],
        },
        {
          path: "analytics",
          moduleName: "Analytics",
          element: <InvolvTenantAnalytics />,
        },
        {
          path: "branding",
          moduleName: "settings_branding",
          element: <InvolvBranding />,
        },
        { path: "permission-denied", element: <PermissionDenied /> },
        {
          path: "admins",
          moduleName: "settings_admins",
          children: [
            {
              path: "",
              moduleName: "settings_admins",
              element: <InvolvTenantSettingsAdmins />,
            },
            {
              path: "invite-admin",
              moduleName: "settings_admins",
              element: <InvolvTenantAdminForm />,
            },
            {
              path: "edit-admin/:adminId",
              moduleName: "settings_admins",
              element: <InvolvTenantAdminForm />,
            },
          ],
        },
        {
          path: "my-profile",
          moduleName: "myprofile",
          element: <InvolvTenantSettingsGeneral />,
        },
        {
          path: "settings",
          moduleName: "settings",
          element: <InvolvTenantSettings />,
          children: [
            {
              path: "",
              moduleName: "settings",
              element: <InvolvTenantSettingsList />,
            },
            {
              path: "list",
              moduleName: "settings",
              element: <InvolvTenantSettingsList />,
            },
            {
              path: "search",
              moduleName: "settings_search",
              element: <InvolvComingSoon />,
            },
            {
              path: "domain",
              moduleName: "settings_domain",
              element: <InvolvComingSoon />,
            },
            {
              path: "language",
              moduleName: "settings_language",
              element: <InvolvComingSoon />,
            },
            {
              path: "notification",
              moduleName: "settings_notification",
              element: <InvolvComingSoon />,
            },
            {
              path: "mobile",
              moduleName: "settings_mobile",
              element: <InvolvComingSoon />,
            },
            {
              path: "plans",
              moduleName: "settings_plan",
              element: <InvolvComingSoon />,
            },
            {
              path: "billing",
              moduleName: "settings_billing",
              element: <InvolvComingSoon />,
            },
            {
              path: "legal",
              moduleName: "settings_legal",
              element: <InvolvComingSoon />,
            },
            {
              path: "institute-details",
              moduleName: "settings_general",
              element: <InvolvInstituteDetails />,
            },
            {
              path: "security",
              moduleName: "settings_security",
              element: <InvolvTenantSecurity />,
            },
            {
              path: "directory",
              moduleName: "directory",
              element: <Outlet />,
              children: [
                {
                  path: "",
                  moduleName: "Security Configuration",
                  element: <InvolvTenantDirectoryList />,
                },
                {
                  path: "directory-configuration",
                  moduleName: "Security Configuration",
                  element: <InvolvTenantDirectoryConfig />,
                },
                {
                  path: "directory-configuration/:directoryId",
                  moduleName: "Security Configuration",
                  element: <InvolvTenantDirectoryConfig />,
                },
              ],
            },
            { path: "permission-denied", element: <PermissionDenied /> },
          ],
        },
        {
          path: "settings",
          moduleName: "settings_terms_of_service",
          children: [
            {
              path: "custom-terms-of-service",
              moduleName: "settings_terms_of_service",
              element: <InvolvTosListing />,
              breadcrumb: "Custom Example",
            },
            {
              path: "custom-terms-of-service/add-new",
              moduleName: "settings_terms_of_service",
              element: <InvolvTosForm />,
            },
            {
              path: "custom-terms-of-service/edit/:gdprId",
              moduleName: "settings_terms_of_service",
              element: <InvolvTosForm />,
            },
          ],
        },
      ],
    },
    {
      path: "why-unite",
      moduleName: "landing-page",
      element: <InvolveAdminWhyUnite />,
      authCheckNotRequired: true,
    },
    {
      path: "scholar-hub",
      moduleName: "landing-page",
      element: <InvolvScholarHub />,
      authCheckNotRequired: true,
    },
    {
      path: "mentor-hub",
      moduleName: "landing-page",
      element: <InvolvAdminMentorHub />,
      authCheckNotRequired: true,
    },
    {
      path: "nerve-centre",
      moduleName: "landing-page",
      element: <InvolvSolutions />,
      authCheckNotRequired: true,
    },
    {
      path: "about-us",
      moduleName: "landing-page",
      element: <InvolvAboutUs />,
      authCheckNotRequired: true,
    },
    {
      path: "trust-centre",
      moduleName: "landing-page",
      element: <InvolveTrustCenter />,
      authCheckNotRequired: true,
    },
    {
      path: "mobile",
      moduleName: "landing-page",
      element: <InvolvMobile />,
      authCheckNotRequired: true,
    },
    {
      path: "resources",
      moduleName: "landing-page",
      element: <InvolvResources />,
      authCheckNotRequired: true,
    },
  ];

  let element = useRoutes(routes);
  const { route: authRoute, setRoute } = useAuth();

  useEffect(() => {
    if (authRoute?.length === 0) {
      setRoute(routes);
    }
  }, [authRoute]);

  if (isEmpty(authRoute)) {
    return null;
  }

  return <AuthCheck>{element}</AuthCheck>;
};
