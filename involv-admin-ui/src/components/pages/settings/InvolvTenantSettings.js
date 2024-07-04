import React from "react";
import { Outlet } from "react-router-dom";
import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
import LayoutTransition from "../../shared/LayoutTransition";

function InvolvTenantSettings() {
  return (
    <LayoutTransition>
      <div>
        <div className="font-bold text-gray-600 text-md">Settings</div>
        <InvolvTenantBreadcrumbs />
        <div className="py-5">
          <Outlet />
        </div>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantSettings;
