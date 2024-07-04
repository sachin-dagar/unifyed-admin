import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { useAuth } from "../../services/api/context/authContext/AuthContext";
import LoggedInMenu from "./InvolveLoginMenu";
import toast from "react-hot-toast";
import { AuthService } from "../../services/api/auth/AuthService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvolvTenantHeader() {
  const { userProfile, logout } = useAuth();

  return (
    <main className="flex flex-col bg-gray-100 h-full ">
      <div className=" sticky top-0 z-10 bg-white border-b border-gray-200 px-3 py-3 2xl:px-4 2xl:py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        {/* <div className="w-6/12">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-md shadow-sm">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <SearchIcon
                className="mr-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md pb-1 pt-1 border-0 bg-gray-100 "
              placeholder="Search"
            />
          </div>
        </div> */}
        <LoggedInMenu userProfile={userProfile} logout={logout} />
      </div>
      <div className="p-5 bg-gray-100 flex-1 ">
        <Outlet />
      </div>
    </main>
  );
}
