import React from "react";

function InvolvTenantNoDataInTable({}) {
  return (
    <div className="flex justify-center mt-16 mb-16">
      <div className="text-center justify-center">
        <img src="/images/no_data.svg" className="m-auto" />
        <h4 className="font-semibold text-gray-600 text-md mt-5">
          No result found
        </h4>
      </div>
    </div>
  );
}

export default InvolvTenantNoDataInTable;
