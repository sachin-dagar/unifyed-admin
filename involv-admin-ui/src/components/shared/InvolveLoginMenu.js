import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../services/api/context/authContext/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LoggedInMenu = ({ userProfile, logout }) => {
  const { tenant, userPermission } = useAuth();
  const [isGadgetPermission, setIsGadgetPermission] = useState(false);

  useEffect(() => {
    if (userPermission) {
      const isGadgetPermission = userPermission.find(
        (permissionItem) =>
          permissionItem?.subModuleName === "gadget" &&
          permissionItem?.permissionDetail?.canRead
      );

      setIsGadgetPermission(!!isGadgetPermission);
    }
  }, [userPermission]);

  return (
    <div className="flex justify-end w-full">
      <Menu as="div" className="px-3 relative inline-block text-left">
        <Menu.Button className="group w-full  text-sm text-left font-medium text-gray-700 focus:outline-none">
          <span className="flex w-full justify-between items-center">
            <span className="flex min-w-0 items-center justify-between space-x-3">
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
                    {!!userProfile?.fullName &&
                      userProfile?.fullName.split("")[0]}
                  </span>
                )
              )}
              <span className="flex-1 flex flex-col m-w-24">
                <span className="text-gray-900 text-sm  font-medium truncate">
                  {!!userProfile?.fullName &&
                    userProfile?.fullName.split(" ")[0]}
                </span>
              </span>
            </span>
            <ChevronDownIcon
              className="flex-shrink-0  h-5  w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 mx-3 origin-top absolute right-0 min-w-max mt-1 w-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/tenant/my-profile"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    <img src={"/images/profile.svg"} className="h-5 w-5" />
                    <span>My Profile</span>
                  </NavLink>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/setting"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Settings
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Notifications
                  </a>
                )}
              </Menu.Item>
            </div> */}
            </div>
            {isGadgetPermission && (
              <div className="py-1">
                {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Get desktop app
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Support
                  </a>
                )}
              </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/tenant/gadgets"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      <img
                        src={"/images/my-gadgets-icon.svg"}
                        alt="gadget"
                        className="h-5 w-5"
                      />
                      <span>My Gadgets</span>
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
            )}

            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    // href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"
                    )}
                    onClick={logout}
                  >
                    <img
                      src={"/images/signout-icon.svg"}
                      alt="signout"
                      className="h-5 w-5"
                    />
                    <span>Logout</span>
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LoggedInMenu;
