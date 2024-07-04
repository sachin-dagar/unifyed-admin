import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { ChevronRightIcon } from "@heroicons/react/solid";

const InvolvTenantBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="breadcrumbs flex">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-1">
          {breadcrumbs.map(({ breadcrumb, match }, index) => {
            if (match.pathname.includes("/tenant/admins/invite-admin/")) {
              return;
            }

            if (match.pathname.includes("/tenant/admins/edit-admin/")) {
              return;
            }

            if (match.pathname.includes("/tenant/admins/edit-admin")) {
              return (
                <div key={index}>
                  {breadcrumb?.props?.children !== "Home" && (
                    <li className="bc">
                      <div className="flex items-center">
                        <span className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700">
                          {breadcrumb?.props?.children !== "Tenant"
                            ? breadcrumb
                            : "Unite"}
                        </span>
                        {index < breadcrumbs.length - 2 && (
                          <>
                            {breadcrumb !== "Event" && (
                              <ChevronRightIcon
                                className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                                aria-hidden="true"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  )}
                </div>
              );
            }

            if (match.pathname === "/tenant/admins") {
              return (
                <>
                  <div key={index}>
                    <li className="bc">
                      <div className="flex items-center">
                        <Link
                          to="/tenant/settings"
                          className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                          Settings
                        </Link>
                        <ChevronRightIcon
                          className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                          aria-hidden="true"
                        />
                      </div>
                    </li>
                  </div>
                  <div>
                    <li className="bc">
                      <div className="flex items-center">
                        <Link
                          to="/tenant/admins"
                          className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                          Admins
                        </Link>
                        {index < breadcrumbs.length - 1 && (
                          <ChevronRightIcon
                            className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </li>
                  </div>
                </>
              );
            }

            if (
              match.pathname.includes(
                "/tenant/settings/directory/directory-configuration/"
              )
            ) {
              return;
            }

            if (breadcrumb?.props?.children === "Install") {
              return;
            }

            if (match.pathname.includes("/tenant/gadgets/install/")) {
              const pathArr = match.pathname.split("/");
              if (pathArr.length === 6) {
                const gadgetId = pathArr[pathArr.length - 1];
                const gadgetName = pathArr[pathArr.length - 2];
                const urlId = breadcrumb?.props?.children.replaceAll(" ", "-");

                return (
                  <>
                    <div key={index} className="flex">
                      <li className="bc">
                        <div className="flex items-center">
                          <Link
                            to={`/gadget/${gadgetId}`}
                            className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700"
                          >
                            {gadgetName.replaceAll("%20", " ")}
                          </Link>
                          <>
                            <ChevronRightIcon
                              className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                              aria-hidden="true"
                            />
                          </>
                        </div>
                      </li>
                      <li className="bc">
                        <div className="flex items-center">
                          <span className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700">
                            Settings
                          </span>
                        </div>
                      </li>
                    </div>
                  </>
                );
              } else {
                return;
              }
            }

            if (match.pathname.includes("/tenant/gadgets/")) {
              const pathArr = match.pathname.split("/");
              if (pathArr[4]) {
                return;
              }

              if (pathArr[3]) {
                return (
                  <div key={index}>
                    {breadcrumb?.props?.children !== "Home" && (
                      <li className="bc">
                        <div className="flex items-center">
                          <span className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700">
                            {breadcrumb?.props?.children !== "Tenant"
                              ? breadcrumb?.props?.children.replaceAll(
                                  "%20",
                                  " "
                                )
                              : "Unite"}
                          </span>
                        </div>
                      </li>
                    )}
                  </div>
                );
              }
            }

            return (
              <div key={index}>
                {breadcrumb?.props?.children !== "Home" && (
                  <li className="bc">
                    <div className="flex items-center">
                      <Link
                        to={
                          breadcrumb?.props?.children !== "Tenant"
                            ? match.pathname
                            : "/"
                        }
                        className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700"
                      >
                        {breadcrumb?.props?.children !== "Tenant"
                          ? breadcrumb
                          : "Unite"}
                      </Link>
                      {index < breadcrumbs.length - 1 && (
                        <>
                          {breadcrumb !== "Event" && (
                            <ChevronRightIcon
                              className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                              aria-hidden="true"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </li>
                )}
              </div>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default InvolvTenantBreadcrumbs;
