import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

import { useAuth } from "../../services/api/context/authContext/AuthContext";
import toast from "react-hot-toast";
import {
  adminUsersIcon,
  analyticsIcon,
  dashboardIcon,
  gadGetsIcon,
  hamburgerIcon,
  locateIcon,
  settingIcon,
} from "../../AppIcons";
import { PlusIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";

const navigationMenu = [
  // {
  //   name: "Dashboard",
  //   href: "dashboard",
  //   icon: dashboardIcon,
  //   moduleName: "Branding",
  // },
  {
    name: "Analytics",
    href: "analytics",
    icon: analyticsIcon,
    moduleName: "Analytics",
  },
  {
    name: "Users",
    href: "users",
    icon: adminUsersIcon,
    moduleName: "user",
  },
  {
    name: "Gadgets",
    href: "gadgets",
    icon: gadGetsIcon,
    moduleName: "gadget",
    current: false,
  },
  // {
  //   name: "Gadget Config",
  //   href: "config/gadgets-list",
  //   icon: gadGetsIcon,
  //   moduleName: "Invite Admin",
  //   current: false,
  // },
  // {
  //   name: "Settings",
  //   href: "settings",
  //   icon: settingIcon,
  //   moduleName: "Security Configuration",
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvolvTenantSidebar({ onClick }) {
  const { userPermission, userProfile, tenant, setTenant } = useAuth();
  const [navigation, setNavigation] = useState(navigationMenu);
  const [show, setShow] = useState(false);
  const [isSideBarVisible, setisSideBarVisible] = useState(true);
  const [isSettingVisible, setIsSettingVisible] = useState(true);
  const { pathname } = useLocation();
  const handleSideBarVisibility = () => {
    setisSideBarVisible(!isSideBarVisible);
  };
  const setNavigationMenu = (userPermission) => {
    const permissionMenu = navigationMenu?.filter((item) => {
      return (
        userPermission?.find((permissionItem) => {
          return (
            item?.moduleName == permissionItem.subModuleName &&
            permissionItem?.permissionDetail?.canRead
          );
        }) || item?.moduleName === "*"
      );
    });
    const isSettings = userPermission?.find((permissionItem) => {
      return (
        "settings" == permissionItem.subModuleName &&
        permissionItem?.permissionDetail?.canRead
      );
    });
    setIsSettingVisible(isSettings);
    setNavigation(permissionMenu);
  };

  useEffect(() => {
    setNavigationMenu(userPermission);
  }, [userPermission]);

  return (
    <div
      className={`${
        isSideBarVisible ? "w-300" : "w-28"
      }  bg-white   overflow-hidden transition-all h-full ease-out`}
    >
      <div
        className={` fixed top-0 left-0  bg-white z-20  h-full border-r shadow-r ${
          isSideBarVisible ? "w-300" : "w-28"
        } `}
      >
        <div className="md:flex flex-col  h-full   ">
          <div className="flex items-center justify-center md:justify-around flex-shrink-0 px-3 py-3 2xl:px-4 2xl:py-4  cursor-pointer">
            {isSideBarVisible && (
              <NavLink to="/" className="hidden md:inline-block cursor-pointer">
                <img
                  className="h-8 2xl:h-10 w-auto contain"
                  src="data:image/png;base64,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"
                  alt="Involv"
                />
              </NavLink>
            )}
            <div
              className="h-5 w-5 2xl:h-7 2xl:w-7 cursor-pointer"
              onClick={handleSideBarVisibility}
            >
              {hamburgerIcon}
            </div>
          </div>

          <div className=" flex-1  ">
            {tenant && (
              <div className={`border border-gray-200 `}>
                <div
                  className={`flex items-center space-x-2 py-4 px-6 text-base
                ${!isSideBarVisible ? "justify-center" : ""}
                  ${
                    show ? "text-indigo-900" : "text-gray-800"
                  } cursor-pointer text-left border-0
                transition
                `}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <div
                    className={`flex items-center 
                  `}
                  >
                    {userProfile?.tenantRoles.find(
                      (role) =>
                        role?.tenant?.tenantDomain ===
                        tenant?.tenant?.tenantDomain
                    )?.tenant?.iconUrl || tenant?.tenant?.iconUrl ? (
                      <div className="w-9 h-9 2xl:w-11 2xl:h-11">
                        <img
                          className={`w-9 h-9 2xl:w-11 2xl:h-11 border border-black p-[0.5] object-cover rounded-full flex-shrink-0 `}
                          src={
                            userProfile?.tenantRoles.find(
                              (role) =>
                                role?.tenant?.tenantDomain ===
                                tenant?.tenant?.tenantDomain
                            )?.tenant?.iconUrl || tenant?.tenant?.iconUrl
                          }
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 2xl:w-11 2xl:h-11 border border-black p-[0.5] object-cover rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center bg-grayInvolv-300">
                        <img
                          className="w-27px"
                          src={"/images/default-org-icon.svg"}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  {isSideBarVisible && (
                    <div className="flex-1 text-left">
                      <p className="text-sm 2xl:text-base">
                        {
                          userProfile?.tenantRoles.find(
                            (role) =>
                              role?.tenant?.tenantDomain ===
                              tenant?.tenant?.tenantDomain
                          )?.tenant?.organizationName
                        }
                      </p>
                      <span
                        className="text-xs  2xl:text-sm text-gray-400   flex items-center font-normal"
                        data-tip
                        data-for="countryTip"
                      >
                        {locateIcon}
                        <span className="truncate w-36 ">
                          {
                            userProfile?.tenantRoles.find(
                              (role) =>
                                role?.tenant?.tenantDomain ===
                                tenant?.tenant?.tenantDomain
                            )?.tenant?.country
                          }
                        </span>
                        <ReactTooltip
                          id="countryTip"
                          place="top"
                          effect="solid"
                        >
                          {
                            userProfile?.tenantRoles.find(
                              (role) =>
                                role?.tenant?.tenantDomain ===
                                tenant?.tenant?.tenantDomain
                            )?.tenant?.country
                          }
                        </ReactTooltip>
                      </span>
                    </div>
                  )}
                  {isSideBarVisible &&
                    tenant?.role !== "Technical staff" &&
                    tenant?.role !== "Advisor" &&
                    tenant?.role !== "Moderator" && (
                      <div>
                        {!show ? (
                          <ChevronDownIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                        ) : (
                          <ChevronUpIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                        )}
                      </div>
                    )}
                </div>
                {show && userProfile?.tenantRoles?.length && (
                  <div className=" absolute  w-full bg-transparent  px-2  z-40 ">
                    <div className=" max-h-80 h-auto overflow-y-auto no-scrollbar   bg-white border  shadow-lg   rounded-bl-lg rounded-br-lg">
                      {userProfile?.tenantRoles
                        .filter(
                          (role) =>
                            role?.tenant?.tenantDomain !==
                            tenant?.tenant?.tenantDomain
                        )
                        .map((ten, i) => {
                          if (
                            ten.role === tenant.role &&
                            ten?.tenant?.organizationName ===
                              tenant?.tenant?.organizationName
                          )
                            return "";
                          return (
                            <div
                              className={`border-b flex items-center  px-4 py-2 space-x-3 text-base
                        ${!isSideBarVisible ? "justify-center" : ""}
                           text-gray-800
                        cursor-pointer text-left border-0
                        transition-all duration-150 ease-in-out group hover:bg-indigo-50
                        `}
                              key={i}
                              onClick={() => {
                                setShow(false);
                                setTenant(ten);
                                toast.success("Tenant switched");
                              }}
                            >
                              <div className="flex items-center">
                                {ten?.tenant?.iconUrl ? (
                                  <img
                                    className={`w-11 h-11 border border-gray-300 p-[0.5] object-cover rounded-full flex-shrink-0`}
                                    src={ten?.tenant?.iconUrl}
                                    alt="avatar"
                                  />
                                ) : (
                                  <div className="w-11 h-11 border border-gray-300 p-[0.5] object-cover rounded-full flex-shrink-0 bg-grayInvolv-300 flex items-center justify-center">
                                    <img
                                      className={`w-27px`}
                                      src={
                                        ten?.tenant?.iconUrl ||
                                        "/images/default-org-icon.svg"
                                      }
                                      alt="avatar"
                                    />
                                  </div>
                                )}
                              </div>
                              {isSideBarVisible && (
                                <div className="flex-1 text-left">
                                  <p className="text-base group-hover:text-indigo-900">
                                    {ten?.tenant?.organizationName}
                                  </p>
                                  <span
                                    className="text-sm text-gray-400  flex items-center font-normal"
                                    data-tip
                                    data-for={`countryTipSwitch${i}`}
                                  >
                                    {locateIcon}{" "}
                                    <span className="truncate w-36">
                                      {ten?.tenant?.country}
                                    </span>
                                    <ReactTooltip
                                      id={`countryTipSwitch${i}`}
                                      place="top"
                                      effect="solid"
                                    >
                                      {ten?.tenant?.country}
                                    </ReactTooltip>
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      {tenant?.role !== "Technical staff" &&
                        tenant?.role !== "Advisor" &&
                        tenant?.role !== "Moderator" && (
                          <div className="py-4 z-10 border-t  bg-white sticky flex items-center justify-center bottom-0">
                            <button className="primaryBtn shadow-md w-4/5 h-10 2xl:h-11">
                              <PlusIcon className="h-4 w-4 mr-2 text-white" />
                              {isSideBarVisible && (
                                <span className="text-sm 2xl:text-base">
                                  Add University
                                </span>
                              )}
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <nav className="px-3 mt-6 h-2/3 overflow-y-scroll">
              <div className="space-y-2 relative ">
                {navigation.map((item, i) => (
                  <NavLink
                    key={item.name}
                    to={item.href || ""}
                    className={`${
                      pathname.includes(item.href)
                        ? " text-indigo-900 bg-indigo-50"
                        : "text-grey-600 hover:bg-indigo-50 transition-all duration-150 ease-in-out "
                    } ${
                      item.name === "Settings" &&
                      "absolute bottom-32 border-t-2  w-full"
                    }
                  flex items-center  ${
                    !isSideBarVisible ? "justify-center" : "justify-between"
                  } py-4 px-4 text-sm rounded-md h-14 group `}
                  >
                    <div className="flex items-center justify-center space-x-4">
                      {/* <item.icon aria-hidden="true" /> */}
                      <div
                        className={classNames(
                          pathname.includes(item.href)
                            ? "text-indigo-900"
                            : "text-gray-400  ",
                          "flex-shrink-0 group-hover:text-indigo-900"
                        )}
                      >
                        {item.icon}
                      </div>
                      {isSideBarVisible && (
                        <span className="truncate text-base font-normal">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {pathname.includes(item.href) && isSideBarVisible && (
                      <div className="flex justify-end w-full">
                        <div className=" rounded-lg bg-indigo-900 border-indigo-900">
                          &nbsp;
                        </div>
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
          {/* Footer */}
          {isSettingVisible && (
            <div className="my-4 px-3 absolute bottom-0 w-full">
              <NavLink
                key="Settings"
                to="settings"
                className={`${
                  pathname.includes("settings")
                    ? " text-indigo-900 bg-indigo-50"
                    : "text-grey-600 hover:bg-indigo-50 transition-all duration-150 ease-in-out "
                } 
                  flex items-center  ${
                    !isSideBarVisible ? "justify-center" : "justify-between"
                  } py-4 px-4 text-sm rounded-md h-14 group `}
              >
                <div className="flex items-center justify-center space-x-4">
                  <div
                    className={classNames(
                      pathname.includes("settings")
                        ? "text-indigo-900"
                        : "text-gray-400  ",
                      "flex-shrink-0 group-hover:text-indigo-900"
                    )}
                  >
                    {settingIcon}
                  </div>
                  {isSideBarVisible && (
                    <span className="truncate text-base font-normal">
                      Settings
                    </span>
                  )}
                </div>
                {pathname.includes("settings") && isSideBarVisible && (
                  <div className="flex justify-end w-full">
                    <div className=" rounded-lg bg-indigo-900 border-indigo-900">
                      &nbsp;
                    </div>
                  </div>
                )}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
