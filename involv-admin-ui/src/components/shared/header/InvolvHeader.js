import React, { Fragment, useRef, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  ChatAlt2Icon,
  InboxIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import LoggedInMenu from "../InvolveLoginMenu";
import { CloseIcon2 } from "../../../AppIcons";

const solutions = [
  {
    name: "Inbox",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Messaging",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: AnnotationIcon,
  },
  {
    name: "Live Chat",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ChatAlt2Icon,
  },
  {
    name: "Knowledge Base",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvolvHeader() {
  const { loggedIn, logout, userProfile } = useAuth();
  const { pathname } = useLocation();

  let timeout;
  const timeoutDuration = 400;

  const buttonRef = useRef(null);
  const [openState, setOpenState] = useState(false);

  const toggleMenu = (open) => {
    setOpenState((openState) => !openState);
    buttonRef?.current?.click(); // eslint-disable-line
  };

  const onHover = (open, action) => {
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      clearTimeout(timeout);
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
    }
  };

  const handleClick = (open) => {
    setOpenState(!open); // toggle open state in React state
    clearTimeout(timeout); // stop the hover timer if it's running
  };

  const LINK_STYLES = classNames("transition duration-500 ease-in-out");
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <header className="sticky top-0 z-20 shadow relative">
        <Popover className="relative bg-white">
          <div className="flex justify-center xl:justify-between items-center py-5 xl:justify-start container 3xl:w-[1650px] m-auto">
            <div className="flex justify-start xl:w-0 xl:flex-1">
              <NavLink to="/">
                <span className="sr-only">Workflow</span>
                <img
                  src="/images/uniteLogo.svg"
                  alt=""
                  className="w-[144px] 3xl:w-[184px]"
                />
              </NavLink>
            </div>
            {/* Starting UI CHANGE */}
            <div className="-mr-2 -my-2 xl:hidden absolute left-[7px] top-[30px]">
              <Popover.Button className="bg-white rounded-md p-2 pl-0 md:pl-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none  ">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden xl:flex space-x-10">
              <NavLink
                to="/why-unite"
                className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                  pathname === "/why-unite" ? "text-indigo-900" : ""
                }`}
              >
                Why Unite
              </NavLink>
              <NavLink
                to="/gadget"
                className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                  pathname === "/gadget" ? "text-indigo-900" : ""
                }`}
              >
                Marketplace
              </NavLink>
              <NavLink
                to="/mobile"
                className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                  pathname === "/mobile" ? "text-indigo-900" : ""
                }`}
              >
                Mobile
              </NavLink>
              <Popover className="relative">
                {({ open }) => (
                  <div
                    onMouseEnter={() => onHover(open, "onMouseEnter")}
                    onMouseLeave={() => onHover(open, "onMouseLeave")}
                    className="flex flex-col"
                  >
                    <Popover.Button
                      className={`${classNames(
                        open
                          ? "text-blackInvolv-300 outline-none"
                          : "text-blackInvolv-300",
                        "group bg-white rounded-md inline-flex items-center text-sm 2xl:text-lg font-medium outline-none",
                        LINK_STYLES
                      )} ${
                        pathname === "/scholar-hub" ||
                        pathname === "/mentor-hub" ||
                        pathname === "/nerve-centre"
                          ? "text-indigo-900"
                          : ""
                      }`}
                      ref={buttonRef}
                    >
                      <span>Solutions</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-indigo-900" : "text-indigo-900",
                          "ml-2 h-6 w-6 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-full min-w-[11rem] max-w-md xl:max-w-2xl xl:ml-0 xl:left-1/2 xl:-translate-x-1/2 pt-5">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative w-full bg-white px-5 py-6 flex flex-col items-start justify-center">
                            <NavLink
                              to="/scholar-hub"
                              className={`mb-5 ${
                                pathname === "/scholar-hub"
                                  ? "text-indigo-900"
                                  : ""
                              }`}
                            >
                              Scholar Hub
                            </NavLink>
                            <NavLink
                              to="/mentor-hub"
                              className={`mb-5 ${
                                pathname === "/mentor-hub"
                                  ? "text-indigo-900"
                                  : ""
                              }`}
                            >
                              Mentor Hub
                            </NavLink>
                            <NavLink
                              to="/nerve-centre"
                              className={`mb-5 ${
                                pathname === "/nerve-centre"
                                  ? "text-indigo-900"
                                  : ""
                              }`}
                            >
                              Nerve Centre
                            </NavLink>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </div>
                )}
              </Popover>

              <NavLink
                to="/trust-centre"
                className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                  pathname === "/trust-centre" ? "text-indigo-900" : ""
                }`}
              >
                Trust Centre
              </NavLink>
              {/* <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-blackInvolv-300" : "text-blackInvolv-300",
                        "group bg-white rounded-md inline-flex items-center text-sm 2xl:text-lg font-medium"
                      )}
                    >
                      <span>Trust Centre</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-indigo-900" : "text-indigo-900",
                          "ml-2 h-6 w-6 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md xl:max-w-2xl xl:ml-0 xl:left-1/2 xl:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 xl:grid-cols-2"></div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover> */}
              <NavLink
                to="/resources"
                className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                  pathname === "/resources" ? "text-indigo-900" : ""
                }`}
              >
                Resources
              </NavLink>

              {/* <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-blackInvolv-300" : "text-blackInvolv-300",
                        "group bg-white rounded-md inline-flex items-center text-sm 2xl:text-lg font-medium"
                      )}
                    >
                      <span>About</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-indigo-900" : "text-indigo-900",
                          "ml-2 h-6 w-6 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md xl:max-w-2xl xl:ml-0 xl:left-1/2 xl:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 xl:grid-cols-2"></div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover> */}
              <NavLink
                to="/about-us"
                className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                  pathname === "/about-us" ? "text-indigo-900" : ""
                }`}
              >
                About
              </NavLink>
            </Popover.Group>
            <div className="hidden xl:flex items-center justify-end xl:flex-1 xl:w-0 ml-12 3xl:ml-16">
              {loggedIn ? (
                <LoggedInMenu userProfile={userProfile} logout={logout} />
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className="bg-indigo-900 text-white border border-indigo-900 rounded-full mr-4 py-2  min-w-[100px] 3xl:min-w-[151px]  text-center  text-lg h-max"
                  >
                    Sign up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="bg-white text-indigo-900 border border-indigo-900 rounded-full py-2 min-w-[100px] 3xl:min-w-[151px] text-center  text-lg h-max"
                  >
                    Sign in
                  </NavLink>
                </>
              )}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="fixed z-30 top-0 inset-x-0 p-0 transition transform origin-top-right xl:hidden h-full"
            >
              <div className=" h-full  shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="h-full pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div></div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                        <span className="sr-only">Close menu</span>
                        <CloseIcon2 />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6 h-full overflow-auto pb-12">
                    <Popover.Group
                      as="nav"
                      className="flex flex-col space-y-10"
                    >
                      <NavLink
                        to="/why-unite"
                        className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                          pathname === "/why-unite" ? "text-indigo-900" : ""
                        }`}
                      >
                        Why Unite
                      </NavLink>
                      <NavLink
                        to="/gadget"
                        className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                          pathname === "/gadget" ? "text-indigo-900" : ""
                        }`}
                      >
                        Marketplace
                      </NavLink>
                      <NavLink
                        to="/mobile"
                        className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                          pathname === "/mobile" ? "text-indigo-900" : ""
                        }`}
                      >
                        Mobile
                      </NavLink>

                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={`${classNames(
                                open
                                  ? "text-blackInvolv-300 outline-none"
                                  : "text-blackInvolv-300",
                                "group bg-white rounded-md inline-flex items-center text-sm 2xl:text-lg font-medium outline-none"
                              )} ${
                                pathname === "/scholar-hub" ||
                                pathname === "/mentor-hub" ||
                                pathname === "/nerve-centre"
                                  ? "text-indigo-900"
                                  : ""
                              }`}
                            >
                              <span>Solutions</span>
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "text-indigo-900" : "text-indigo-900",
                                  "ml-2 h-6 w-6 group-hover:text-gray-500"
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="relative z-10  mt-3 transform ml-3">
                                {/* <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"> */}
                                <div className="  flex flex-col ">
                                  <NavLink
                                    to="/scholar-hub"
                                    className={`mb-5 ${
                                      pathname === "/scholar-hub"
                                        ? "text-indigo-900"
                                        : ""
                                    }`}
                                  >
                                    Scholar Hub
                                  </NavLink>
                                  <NavLink
                                    to="/mentor-hub"
                                    className={`mb-5 ${
                                      pathname === "/mentor-hub"
                                        ? "text-indigo-900"
                                        : ""
                                    }`}
                                  >
                                    Mentor Hub
                                  </NavLink>
                                  <NavLink
                                    to="/nerve-centre"
                                    className={`mb-5 ${
                                      pathname === "/nerve-centre"
                                        ? "text-indigo-900"
                                        : ""
                                    }`}
                                  >
                                    Nerve Centre
                                  </NavLink>
                                </div>
                                {/* </div> */}
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>

                      <NavLink
                        to="/trust-centre"
                        className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                          pathname === "/trust-centre" ? "text-indigo-900" : ""
                        }`}
                      >
                        Trust Centre
                      </NavLink>

                      <NavLink
                        to="/resources"
                        className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                          pathname === "/resources" ? "text-indigo-900" : ""
                        }`}
                      >
                        Resources
                      </NavLink>

                      <NavLink
                        to="/about-us"
                        className={`text-sm 2xl:text-lg font-medium text-blackInvolv-300 ${
                          pathname === "/about-us" ? "text-indigo-900" : ""
                        }`}
                      >
                        About
                      </NavLink>
                    </Popover.Group>
                    <div className="flex items-center justify-center mt-10">
                      {loggedIn ? (
                        <LoggedInMenu
                          userProfile={userProfile}
                          logout={logout}
                        />
                      ) : (
                        <>
                          <NavLink
                            to="/signup"
                            className="bg-indigo-900 text-white border border-indigo-900 rounded-full mr-4 py-2   min-w-[151px]  text-center  text-sm h-max"
                          >
                            Sign up
                          </NavLink>
                          <NavLink
                            to="/login"
                            className="bg-white text-indigo-900 border border-indigo-900 rounded-full py-2  min-w-[151px] text-center  text-sm h-max"
                          >
                            Sign in
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
    </>
  );
}
