import React, { Fragment, useCallback, useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/solid";
import {
  DotsVerticalIcon,
  CogIcon,
  SupportIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { convertFilterString } from "../../../util";
import { Link, NavLink } from "react-router-dom";
import InvolvTenantPagination from "../../shared/Pagination/InvolvTenantPagination";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import Loader from "../../shared/loader/Loader";
import InvolvButton from "../../shared/InvolvButton";
import Constants from "../../../constants";
import { searchIconLight } from "../../../AppIcons";
import LayoutTransition from "../../shared/LayoutTransition";
import InvolvTenantNoData from "../../shared/InvolvTenantNoData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvolvTenantGadgetsList() {
  const [loading, setLoading] = useState(false);
  const [currentButton, setCurrentButton] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [gadgetList, setGadgetList] = useState([]);
  const [totalCount, setTotalCount] = useState(2);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { tenant } = useAuth();
  const [filterAction, setFilterAction] = useState({
    page: 1,
    limit: 10,
    sortBy: "asc",
    keyword: "",
    category: "",
  });

  useEffect(async () => {
    if (!tenant?.tenant?.tenantDomain) {
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      let filterURL = convertFilterString({
        pageNo: filterAction?.page,
        limit: filterAction?.limit,
        sortBy: filterAction?.sortBy,
        keyword: searchKeyword || filterAction?.keyword,
        tenantId: tenant?.tenant?.tenantDomain,
      });
      const result = await GadgetService.getTenantGadgetList(
        tenant?.tenant?.tenantDomain,
        filterURL
      );
      if (result?.status === 403)
        throw new Error(data?.errorMessage || "Something went wrong");
      setGadgetList(result?.gadgetList);
      setTotalCount(result?.totalCount);
      setLoading(false);
    } catch (err) {
      setErrorMsg(err?.message || "Something went wrong!");
      toast.error(err?.message || "Something went wrong!");
      setLoading(false);
    }
  }, [searchKeyword, tenant?.tenant?.tenantDomain, gadgetList?.length]);

  const handleUninstallGadget = async (gadgetId) => {
    try {
      const response = await GadgetService.uninstallGadget(gadgetId);
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      const newGadgetList = gadgetList.filter(
        (gadget) => gadget?._id !== response?._id
      );
      setGadgetList(newGadgetList);
      toast.success("Gadget uninstalled successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handlePagination = useCallback(async (filterValues) => {
    try {
      let filterURL = convertFilterString({
        pageNo: filterValues?.page,
        limit: filterValues?.limit,
        sortBy: filterValues?.sortBy,
        keyword: searchKeyword || filterValues?.keyword,
        tenantId: tenant?.tenant?.tenantDomain,
      });
      setFilterAction({ ...filterAction, ...filterValues });
      const result = await GadgetService.getTenantGadgetList(
        tenant?.tenant?.tenantDomain,
        filterURL
      );
      if (result?.status === 403)
        throw new Error(data?.errorMessage || "Something went wrong");
      setGadgetList(result?.gadgetList);
      setTotalCount(result?.totalCount);
    } catch (err) {
      setErrorMsg(err?.message || "Something went wrong!");
      toast.error(err?.message || "Something went wrong!");
    }
  });

  return (
    <LayoutTransition>
      <div className="bg-white pt-6 pb-6 px-6 rounded-md shadow mt-5 ">
        <div className="pb-5 flex mb-2 justify-between">
          <div className="w-10/12 flex items-center">
            <div className="font-medium text-grayInvolv-900 text-lg 2xl:text-xl mr-8">
              Gadgets List
            </div>
            <div className="w-2/5">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative rounded-md ">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="mr-4  ">{searchIconLight}</div>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  defaultValue={searchKeyword}
                  onKeyUp={(e) => {
                    setSearchKeyword(e.target.value);
                  }}
                  className="focus:ring-indigo-900 focus:border-indigo-900 block w-full pl-9 text-sm border-gray-200 rounded-md pb-1.5 pt-1.5 font-normal h-9 placeholder-gray-400"
                  placeholder="Search Gadgets"
                />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader customClass="flex justify-center py-5" />
        ) : errorMsg ? (
          <div className="text-red-500 text-xs">{errorMsg}</div>
        ) : (
          <>
            {gadgetList.length > 0 ? (
              <>
                {gadgetList?.map((el) => (
                  <div
                    className="block p-3 rounded-md  bg-white w-full mb-4 border border-gray-200 flex justify-between items-center hover:shadow-md"
                    key={el.gadgetId}
                  >
                    <div className="lg:w-2/5 md:w-auto flex items-center">
                      <img
                        src={el?.tenantGadgetIcon}
                        className="h-14 w-14 2x:h-16 2xl:w-16 rounded object-cover"
                      />
                      <div className="w-full md:w-auto ml-0 md:ml-3 text-gray-700 text-base  mt-4 md:mt-0">
                        <div className="text-base 2xl:text-xl font-medium text-grayInvolv-900 flex items-center">
                          {el.tenantGadgetName}
                          {el.new && (
                            <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-normal bg-greenInvolv-300 text-white rounded text-sm ml-2">
                              New
                            </span>
                          )}
                        </div>
                        <div className="text-grayInvolv-600 text-sm 2xl:text-base font-light">
                          {el.tenantGadgetDescription}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0 justify-between">
                      <div className="text-sm font-medium text-grayInvolv-600 w-40 text-right flex items-center justify-center">
                        Ver {el?.latestVersion}
                      </div>
                      <div className="text-greenInvolv-300 flex w-40 text-right items-center justify-center">
                        {Constants?.gadgetStatus[el?.state] === "Configure" ? (
                          <Link
                            className="items-center inline-block px-4 py-2 font-medium text-sm leading-tight rounded shadow-md transition duration-150 ease-in-out text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg primaryBtn"
                            to={`/tenant/gadgets/${el.tenantGadgetName}/${el.gadgetId}`}
                          >
                            {Constants?.gadgetStatus[el?.state]}
                          </Link>
                        ) : (
                          <>
                            <CheckCircleIcon className="h-5 w-5 2xl:h-6 2xl:w-6 text-greenInvolv-300" />
                            <div className="italic text-sm 2xl:text-base">
                              {Constants?.gadgetStatus[el?.state]}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-xl 2xl:text-2Xl font-medium text-grayInvolv-900 w-40 text-right text-right flex items-center justify-center">
                        {el?.currency == "USD" ? "$" : "Rs"}
                        {el?.price}
                      </div>
                      <div className="flex items-center justify-center w-40">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button>
                              <DotsVerticalIcon className="p-1 w-8 h-8 text-gray-500 hover:bg-gray-200 rounded-full transition-all ease-in-out duration-150" />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`/tenant/gadgets/${el.tenantGadgetName}/${el.gadgetId}`}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2  text-sm flex items-center"
                                      )}
                                    >
                                      <CogIcon className="h-4 w-4 mr-1 text-gray-400" />{" "}
                                      Settings
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2  text-sm flex items-center"
                                      )}
                                    >
                                      <SupportIcon className="h-4 w-4 mr-1 text-gray-400" />{" "}
                                      Support
                                    </a>
                                  )}
                                </Menu.Item>
                                {el?.gadgetBuiltType !== "core" && (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <span
                                        onClick={() =>
                                          handleUninstallGadget(el?._id)
                                        }
                                        className="bg-gray-100 text-gray-900 px-4 py-2  text-sm flex items-center cursor-pointer"
                                      >
                                        <TrashIcon className="h-4 w-4 mr-1 text-gray-400" />{" "}
                                        Uninstall
                                      </span>
                                    )}
                                  </Menu.Item>
                                )}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-4">
                  <div></div>
                  <div className="col-span-5">
                    <div className="flex justify-center my-20 space-x-1 w-full">
                      {!_.isEmpty(gadgetList) &&
                        totalCount &&
                        totalCount > filterAction?.limit && (
                          <InvolvTenantPagination
                            currentButton={currentButton}
                            setCurrentButton={setCurrentButton}
                            pages={
                              totalCount / filterAction?.limit +
                              (totalCount % filterAction?.limit > 0 && 1)
                            }
                            setFilterAction={handlePagination}
                            filterAction={filterAction}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <InvolvTenantNoData isBtn={false} isBtnMessage={false} />
            )}
          </>
        )}
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantGadgetsList;
