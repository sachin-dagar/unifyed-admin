import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { ChevronRightIcon } from "@heroicons/react/solid";

const InvolvTenantBreadcrumbBranding = () => {
  return (
    <div className="breadcrumbs flex">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-1">
          <div className="flex">
            <li className="bc">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Unite
                </Link>
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-3 text-gray-400 ml-1 mr-1"
                  aria-hidden="true"
                />
              </div>
            </li>
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
            <li className="bc">
              <div className="flex items-center">
                <Link
                  to="/tenant/branding"
                  className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Branding
                </Link>
              </div>
            </li>
          </div>
        </ol>
      </nav>
    </div>
  );
};

export default InvolvTenantBreadcrumbBranding;
