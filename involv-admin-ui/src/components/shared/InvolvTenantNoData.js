import React from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

function InvolvTenantNoData({
  btnTitle = "Add User",
  btnHandler = () => {},
  isBtn = true,
  isBtnMessage = true,
}) {
  return (
    <div className="flex justify-center mt-16 mb-16">
      <div className="text-center justify-center">
        <img src="/images/no_data.svg" className="m-auto" />
        <h4 className="font-semibold text-gray-600 text-md mt-5">
          No data to display
        </h4>
        {isBtnMessage && (
          <p className=" text-gray-600 text-xs mt-2">
            Please add users by clicking on "{btnTitle}"
          </p>
        )}
        {isBtn && (
          <button
            onClick={btnHandler}
            type="button"
            className="flex items-center inline-block px-12 py-4 bg-indigo-900 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out m-auto mt-4"
          >
            {/* <PlusCircleIcon className="h-4 w-4 mr-1" /> */}
            {btnTitle}
          </button>
        )}
      </div>
    </div>
  );
}

export default InvolvTenantNoData;
