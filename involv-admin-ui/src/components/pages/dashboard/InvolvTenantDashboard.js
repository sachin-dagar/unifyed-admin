import { SpeakerphoneIcon, XIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import LayoutTransition from "../../shared/LayoutTransition";

const data = [
  ["Task", "Hours per Day"],
  ["Active", 11],
  ["Inactive", 2],
];

const options = {
  title: "",
  pieHole: 0.4,
  is3D: false,
  legend: "none",
};

function InvolvTenantDashboard() {
  const { loggedIn, userProfile } = useAuth();

  return (
    <LayoutTransition>
      <div className="">
        <div className="mb-5">
          Hi {userProfile?.fullName} - here is what's happening with your
          institute today.
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 flex flex-col flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:p-3">
                  <div className="flex justify-between">
                    <div className="font-bold text-sm text-gray-600">
                      People Overview
                    </div>
                    <div className="text-green-500 text-xs font-semibold">
                      * Live view
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col flex-1 items-center justify-center">
                      <div className="text-gray-300">Active Now</div>
                      <div className="font-bold text-md">3,095</div>
                    </div>
                    <div>
                      <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"150px"}
                        height={"150px"}
                      />
                    </div>
                    <div className="flex flex-col flex-1 items-center justify-center">
                      <div className="text-gray-300">Inactive</div>
                      <div className="font-bold text-md">1,095</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-3 py-3 sm:p-3">
                  <div className="flex justify-between">
                    <div className="font-bold text-sm text-gray-600">
                      Average time on site
                    </div>
                    <div className="text-green-500 text-xs font-semibold">
                      Today
                    </div>
                  </div>
                  <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="150px"
                    data={data}
                    options={options}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="max-w-7xl mx-auto ">
                <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="flex p-2 rounded-lg bg-indigo-800">
                        <SpeakerphoneIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="ml-3 font-medium text-white truncate">
                        <span className="md:hidden">
                          We announced a new product!
                        </span>
                        <span className="hidden md:inline">
                          Your account is currently under a free plan. To go
                          live select a plan
                        </span>
                      </p>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                      >
                        Select Plan
                      </a>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                      <button
                        type="button"
                        className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="max-w-7xl mx-auto ">
                <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="flex p-2 rounded-lg bg-indigo-800">
                        <SpeakerphoneIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="ml-3 font-medium text-white truncate">
                        <span className="md:hidden">
                          We announced a new product!
                        </span>
                        <span className="hidden md:inline">
                          Your account is currently under a free plan. To go
                          live select a plan
                        </span>
                      </p>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                      >
                        Select Plan
                      </a>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                      <button
                        type="button"
                        className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4"></div>
        </div>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantDashboard;
