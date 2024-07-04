import React, { Fragment, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import InvolvTenantPagination from "../../shared/Pagination/InvolvTenantPagination";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import Loader from "../../shared/loader/Loader";
import InvolvButton from "../../shared/InvolvButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvolvTenantGadgetsList() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [gadgetList, setGadgetList] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
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

  return (
    <div className="bg-white pt-6 pb-6 px-6 rounded mt-5 border">
      <div className="pb-5 flex mb-2 justify-between">
        <div className="w-10/12 flex items-center">
          <div className="font-medium text-grayInvolv-900 text-lg mr-8">
            Gadgets List
          </div>
          <div className="w-6/12">
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
                defaultValue={searchKeyword}
                onKeyUp={(e) => {
                  setSearchKeyword(e.target.value);
                }}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md pb-1.5 pt-1.5  "
                placeholder="Search Gadgets"
              />
            </div>
          </div>
        </div>
        <Link to="/gadget">
          <InvolvButton classes="items-center flex py-2 justify-end">
            <PlusIcon className="h-4 w-4 mr-1" /> Add Gadget
          </InvolvButton>
        </Link>
      </div>
      {loading ? (
        <Loader customClass="flex justify-center py-5" />
      ) : errorMsg ? (
        <div className="text-red-500 text-xs">{errorMsg}</div>
      ) : (
        <>
          {gadgetList?.map((el) => (
            <div
              className="block p-3 rounded shadow-sm bg-white w-full mb-4 border flex justify-between items-center hover:shadow-md hover:scale-50"
              key={el.gadgetId}
            >
              <div className="w-full md:w-auto flex items-center">
                <img src={el?.tenantGadgetIcon} className="h-16 w-16" />
                <div className="w-full md:w-auto ml-0 md:ml-3 text-gray-700 text-base  mt-4 md:mt-0">
                  <div className="text-2xl font-medium text-grayInvolv-900 flex items-center">
                    {el.tenantGadgetName}
                    {el.new && (
                      <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-normal bg-greenInvolv-300 text-white rounded text-sm ml-2">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-grayInvolv-600 text-base font-light">
                    {el.tenantGadgetDescription}
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <div className="text-sm font-medium text-grayInvolv-600 w-20 text-right">
                  Ver {el?.latestVersion}
                </div>
                <div className="ml-3 mr-3 md:ml-14 md:mr-14 text-greenInvolv-300 flex w-36 text-right  ">
                  <CheckCircleIcon className="h-6 w-8 text-greenInvolv-300" />
                  <div className="italic text-base">{el?.state}</div>
                </div>
                <div className="mr-10 text-Xll font-medium text-grayInvolv-900 w-40 text-right text-right">
                  {el?.currency} {el?.price}
                </div>
                <div>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button>
                        <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
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
                                  "block px-4 py-2 text-sm flex items-center"
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
                                  "block px-4 py-2 text-sm flex items-center"
                                )}
                              >
                                <SupportIcon className="h-4 w-4 mr-1 text-gray-400" />{" "}
                                Support
                              </a>
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
                                  "block px-4 py-2 text-sm flex items-center"
                                )}
                              >
                                <TrashIcon className="h-4 w-4 mr-1 text-gray-400" />{" "}
                                Uninstall
                              </a>
                            )}
                          </Menu.Item>
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
                      setFilterAction={setFilterAction}
                      filterAction={filterAction}
                    />
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InvolvTenantGadgetsList;
