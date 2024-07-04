import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../services/api/context/authContext/AuthContext";
import Loader from "./shared/loader/Loader";
import AuthLayout from "../Layout/AuthLayout";
import { locateIcon } from "../AppIcons";
import ReactTooltip from "react-tooltip";
import LayoutTransition from "./shared/LayoutTransition";
import { GadgetService } from "../services/api/gadget/GadgetService";
import { convertFilterString } from "../util";

const carouselData = [
  {
    name: "Step 1",
    image: "/images/selectcollege.png",
    href: "#",
    status: "current",
    mainText: "Manage Institute",
    subText: "Choose the campus and customize the portal in your own way",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvolvTenantListing() {
  const { userProfile, setTenant, logout, apiLoader } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const gadgetId = searchParams?.get("gadgetId");
  const navigate = useNavigate();

  const selectTenant = async (tenantInfo) => {
    setLoading(true);
    const result = await setTenant(tenantInfo);
    if (!result) {
      return;
    }
    const gadgetDetails = await GadgetService.getGadgetByGadgetId(gadgetId);
    let filterURLInstalled = convertFilterString({
      pageNo: 1,
      limit: 100,
    });
    const installedGadgets = await GadgetService.getTenantGadgetList(
      tenantInfo?.tenant?.tenantDomain,
      filterURLInstalled
    );
    if (gadgetId) {
      if (
        installedGadgets?.gadgetList.find(
          (gadget) => gadget.gadgetId === gadgetId
        )
      ) {
        navigate(`/tenant/gadgets/${gadgetDetails?.gadgetName}/${gadgetId}`);
      }
      navigate(
        `/tenant/gadgets/install/${gadgetDetails?.gadgetName}/${gadgetId}`
      );
      setLoading(false);
    } else {
      navigate("/tenant/analytics");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userProfile?.tenantRoles?.length === 1) {
      selectTenant(userProfile?.tenantRoles[0]);
    }
  }, []);

  useEffect(() => {
    window.history.forward();
    window.onunload = function () {
      null;
    };
  }, []);

  if (apiLoader) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <LayoutTransition>
      <AuthLayout
        carouselData={carouselData}
        LogOutMenuComponent={
          <Menu as="div" className="ml-3 relative w-96">
            <div className="flex justify-end">
              <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                {userProfile?.iconUrl ? (
                  <img
                    className="w-7 h-7 2xl:w-8 2xl:h-8 bg-gray-300 rounded-full flex-shrink-0"
                    src={
                      userProfile?.iconUrl || "/images/default-tenant-icon.svg"
                    }
                    alt=""
                  />
                ) : (
                  userProfile?.fullName && (
                    <span
                      className="w-7 h-7 2xl:w-8 2xl:h-8 bg-indigo-600 text-white rounded-full flex-shrink-0 text-center font-bold capitalize text-xl"
                      style={{
                        paddingTop: ".12rem",
                      }}
                    >
                      {userProfile?.fullName.split("")[0]}
                    </span>
                  )
                )}
                {/* <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span> */}
                <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                  <span className="sr-only">Open user menu for </span>
                  {userProfile?.fullName?.split(" ")[0]}
                  {}
                </span>
                <ChevronDownIcon
                  className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Your Profile
            </a>
          )}
        </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      <img
                        src={"/images/signout-icon.svg"}
                        alt="signout"
                        className="h-5 w-5"
                      />
                      <span>Logout </span>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        }
        childContainerPosition="justify-start pt-20"
        maxWidth="max-w-2xl"
      >
        <div>
          <div className="mx-auto">
            {!userProfile?.email ? (
              <div className="w-96 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <div>
                  <h1 className="text-2xl 2xl:text-3xl mt-8 font-normal">
                    Select Institute
                  </h1>
                  <div className="my-5 max-h-400 overflow-y-scroll no-scrollbar h-auto flex flex-col gap-3 flex-1 p-2">
                    {loading ? (
                      <Loader customClass="flex justify-center" />
                    ) : (
                      userProfile?.tenantRoles
                        .sort((a, b) => {
                          if (
                            a?.tenant?.organizationName?.toLowerCase() <
                            b?.tenant?.organizationName?.toLowerCase()
                          ) {
                            return -1;
                          }
                          if (
                            a?.tenant?.organizationName?.toLowerCase() >
                            b?.tenant?.organizationName?.toLowerCase()
                          ) {
                            return 1;
                          }
                          return 0;
                        })
                        ?.map((tr, index) => (
                          <a
                            href=""
                            data-tip
                            data-for={`country${index}`}
                            key={index}
                            className="relative rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm flex items-center space-x-3 hover:border-indigo-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 hover:border-right-indigo-900 hover:border-r-4 hover:bg-indigo-50"
                            onClick={(e) => {
                              e.preventDefault();
                              selectTenant(tr);
                            }}
                          >
                            <div className="flex-shrink-0">
                              {tr?.tenant?.iconUrl ? (
                                <img
                                  className="h-12 w-12 rounded-full"
                                  src={tr?.tenant?.iconUrl}
                                  alt="avatar"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-grayInvolv-300 flex items-center justify-center">
                                  <img
                                    className="w-6"
                                    src={"/images/default-org-icon.svg"}
                                    alt="avatar"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <a href="#" className="focus:outline-none">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-gray-900">
                                  {tr?.tenant?.organizationName}
                                </p>
                                {tr?.tenant?.country && (
                                  <span className="text-xs  2xl:text-sm text-gray-400   flex items-center font-normal">
                                    {locateIcon}
                                    <span className="truncate ">
                                      {tr?.tenant?.country}
                                    </span>
                                  </span>
                                )}
                              </a>
                            </div>
                            <div className="ml-5 flex-shrink-0">
                              <ChevronRightIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <ReactTooltip
                              id={`country${index}`}
                              place="bottom"
                              effect="solid"
                            >
                              {tr?.tenant?.country}
                            </ReactTooltip>
                          </a>
                        ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </AuthLayout>
    </LayoutTransition>
  );
}

export default InvolvTenantListing;
