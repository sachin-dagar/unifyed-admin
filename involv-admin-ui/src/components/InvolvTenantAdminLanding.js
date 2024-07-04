import React, { useState } from "react";

import InvolvTenantHeader from "./shared/InvolvTenantHeader";
import InvolvTenantSidebar from "./shared/InvolvTenantSidebar";

export default function InvolvTenantAdminLanding({}) {
  return (
    <>
      <div className="min-h-screen md:flex flex-row bg-gray-100">
        <InvolvTenantSidebar />
        <div className="flex-1">
          <InvolvTenantHeader />
        </div>
      </div>
    </>
  );
}
