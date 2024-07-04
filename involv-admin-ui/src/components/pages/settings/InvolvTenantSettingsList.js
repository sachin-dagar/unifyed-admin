import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  adminsIcon,
  billingIcon,
  brandingIcon,
  directoryIcon,
  domainIcon,
  generalIcon,
  instituteIcon,
  languageIcon,
  legalIcon,
  mobileIcon,
  notificationIcon,
  plansIcon,
  searchIcon,
  securityIcon,
  usersIcons,
  termsOfConditionIcon,
} from "../../../AppIcons";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import { getallSecurityData } from "../../../services/api/security/SecurityService";
import LayoutTransition from "../../shared/LayoutTransition";
import Loader from "../../shared/loader/Loader";
import { isEmpty } from "lodash";

const settingMenu = [
  {
    name: "Institute Details",
    theme: "hyper",
    href: "/tenant/settings/institute-details",
    icon: instituteIcon,
    desc: "Manage profile,account preferences & password",
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
    moduleName: "settings_general",
  },
  {
    name: "Admins",
    theme: "oceanic",
    href: "/tenant/admins",
    icon: adminsIcon,
    desc: "Specify which admin can access & manage your institute portal",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    moduleName: "settings_admins",
  },
  {
    name: "Search",
    theme: "cottoncandy",
    href: "/tenant/settings/search",
    icon: searchIcon,
    desc: "Enable/Disable search and configure search results. ",
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
    moduleName: "settings_search",
  },
  {
    name: "Branding",
    theme: "cottoncandy",
    href: "/tenant/branding",
    icon: brandingIcon,
    desc: "Customize the login experience",
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
    moduleName: "*",
  },
  {
    name: "Domain",
    theme: "beachside",
    href: "/tenant/settings/domain",
    icon: domainIcon,
    desc: "Add customize & verify your domain",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
    moduleName: "settings_domain",
  },
  {
    name: "Language",
    theme: "gunmetal",
    href: "/tenant/settings/language",
    icon: languageIcon,
    desc: "Controls the language of the interface across the platform",
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
    moduleName: "settings_language",
  },
  {
    name: "Notifications",
    theme: "peachy",
    href: "/tenant/settings/notification",
    icon: notificationIcon,
    desc: "Set notification preferences for your admin and users",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
    moduleName: "*",
  },
  {
    name: "Mobile",
    theme: "pandora",
    href: "/tenant/settings/mobile",
    icon: mobileIcon,
    desc: "Configure mobile app metadata ",
    iconForeground: "text-pink-700",
    iconBackground: "bg-pink-50",
    moduleName: "settings_mobile",
  },
  {
    name: "Plans",
    theme: "hyper",
    href: "/tenant/settings/plans",
    icon: plansIcon,
    desc: "Allows admin to view & select from available plans offered ",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    moduleName: "settings_plan",
  },
  {
    name: "Users",
    theme: "beachside",
    href: "/tenant/users",
    icon: usersIcons,
    desc: "Specify and control users that can acess your institute's portal",
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
    moduleName: "*",
  },
  {
    name: "Billing",
    theme: "peachy",
    href: "/tenant/settings/billing",
    icon: billingIcon,
    desc: "View invoices,edit or make payments,add or change subscriptions",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
    moduleName: "settings_billing",
  },
  {
    name: "Legal",
    theme: "cottoncandy",
    href: "/tenant/settings/legal",
    icon: legalIcon,
    desc: "Manage your account's legal policies",
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
    moduleName: "settings_legal",
  },
  {
    name: "Security",
    theme: "oceanic",
    href: "/tenant/settings/security",
    icon: securityIcon,
    desc: "Set & modify security settings for users",
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
    moduleName: "settings_security",
  },
  {
    name: "Directory",
    theme: "hyper",
    href: "/tenant/settings/directory",
    icon: directoryIcon,
    desc: "See into your directory folder.",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    moduleName: "directory",
  },
  {
    name: "Custom Terms of Service",
    theme: "hyper",
    href: "/tenant/settings/custom-terms-of-service",
    icon: termsOfConditionIcon,
    desc: "Let your users agree to the terms of use before they may start using the system.",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    moduleName: "settings_terms_of_service",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvolvTenantSettingsList() {
  const { userPermission, tenant } = useAuth();
  const [settings, setSettings] = useState(settingMenu);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(async () => {
    setLoading(true);
    if (userPermission) {
      try {
        const response = await getallSecurityData();
        const isSetting = userPermission?.find(
          (permissionItem) =>
            "settings" == permissionItem.subModuleName &&
            permissionItem?.permissionDetail?.canRead
        );
        if (!isSetting) {
          navigator("/tenant/analytics");
        }
        const permissionMenu = settings?.filter((item) =>
          userPermission?.find((permissionItem) => {
            return (
              (item?.moduleName == permissionItem.subModuleName ||
                item?.moduleName === "*") &&
              permissionItem?.permissionDetail?.canRead
            );
          })
        );
        if (response?.authType && response?.authType == "local") {
          const curretnSettings = permissionMenu?.filter(
            (item) => item.name !== "Directory"
          );
          setSettings(curretnSettings);
        } else {
          setSettings(permissionMenu);
        }
        setLoading(false);
      } catch (error) {
        console.log(error?.message);
        setLoading(false);
      }
    }
  }, [userPermission]);

  // useEffect(async () => {
  //   if (userPermission) {
  //     setLoading(true);
  //     try {
  //       const response = await getallSecurityData();
  //       if (response?.authType && response?.authType == "local") {
  //         const curretnSettings = settings?.filter(
  //           (item) => item.name !== "Directory"
  //         );
  //         setSettings(curretnSettings);
  //       } else {
  //         setSettings(settingMenu);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error?.message);
  //       setLoading(false);
  //     }
  //   }
  // }, [tenant?.tenant?.tenantDomain, userPermission]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <LayoutTransition>
      {loading ? (
        <div className="flex justify-center h-screen w-full items-center">
          <Loader />
        </div>
      ) : (
        <div className="rounded-lg bg-white overflow-hidden p-5 shadow sm:divide-y-0 sm:grid sm:grid-cols-3 gap-5 sm:gap-px">
          {settings.map((setting, index) => (
            <Link
              to={setting.href}
              key={index}
              className={classNames(
                // index === 0
                //   ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                //   : "",
                // index === 2 ? "sm:rounded-tr-lg" : "",
                // index === settings.length - 3 ? "sm:rounded-bl-lg" : "",
                // index === settings.length - 1
                //   ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                //   : "",
                "relative  bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-900",
                " hover:text-indigo-900"
              )}
            >
              <div className="flex space-x-3 w-full h-full items-center rounded hover:bg-indigo-50 hover:text-indigo-900 text-grayInvolv-900 p-3 2xl:p-4 ">
                <div className="">{setting.icon}</div>
                <div className="flex-1 text-left focus:outline-none ">
                  <span className="text-sm 2xl:text-base font-semibold ">
                    {setting.name}
                  </span>
                  <div className="text-xs 2xl:text-sm text-gray-400  w-2/3">
                    {setting.desc}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </LayoutTransition>
  );
}

export default InvolvTenantSettingsList;
