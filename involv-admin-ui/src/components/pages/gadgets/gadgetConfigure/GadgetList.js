import React, { useEffect, useState, useCallback } from "react";

import { convertFilterString } from "../../../../util";
import { GadgetService } from "../../../../services/api/gadget/GadgetService";
import Loader from "../../../shared/loader/Loader";
import InvolvTenantTable from "../../../shared/InvolvTenantTable";
import InvolvTenantBreadcrumbs from "../../../route/InvolvTenantBreadcrumbs";
import { isEmpty } from "lodash";
import moment from "moment";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import LayoutTransition from "../../../shared/LayoutTransition";
import { NavLink } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import InvolvButton from "../../../shared/InvolvButton";

function GadgetList() {
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [usersData, setUsersData] = useState([""]);
  const [totalCount, setTotalCount] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterAction, setFilterAction] = useState({
    page: 1,
    limit: 5,
    sortBy: "asc",
    keyword: "",
    category: "",
  });
  const columns = [
    {
      Header: "Gadget Name",
      accessor: "gadgetId",
      Cell: ({ value, data }) => {
        const dt = data?.map((el) => {
          if (el.gadgetId == value) {
            return (
              <div
                key={el.gadgetId}
                className="flex items-center text-sm 2xl:text-base"
              >
                <img
                  src={el?.gadgetIcon}
                  className="h-10 w-10 2x:h-12 2xl:w-12 rounded mr-5 object-cover"
                />{" "}
                {el?.gadgetName}
              </div>
            );
          }
        });
        return dt;
      },
    },
    {
      Header: "Gadget Category",
      accessor: "category",
      Cell: ({ value }) => {
        const cat = value?.map((el) => {
          return (
            <div
              key={el._id}
              className="flex items-center text-sm 2xl:text-base"
            >
              {el?.categoryName}
            </div>
          );
        });
        return cat;
      },
    },
    {
      Header: "Gadget Cost",
      accessor: "price",
      Cell: ({ value, data, row }) => {
        return (
          <div className="flex text-sm 2xl:text-base">
            {data ? data[row.index].currency : ""} {value}
          </div>
        );
      },
    },
    {
      Header: "Created Date",
      accessor: "createdAt",
      Cell: ({ value }) => (value ? moment(value).format("LL") : ""),
    },
    {
      Header: "Action",
      accessor: "Action",
      Cell: () => {
        return (
          <div className="flex">
            <PencilAltIcon className="w-5" /> <TrashIcon className="w-5" />
          </div>
        );
      },
    },
  ];
  useEffect(async () => {
    let filterURL = convertFilterString({
      pageNo: filterAction?.page,
      limit: filterAction?.limit,
      sortBy: filterAction?.sortBy,
      keyword: searchKeyword || filterAction?.keyword,
    });
    const result = await GadgetService.getallGadgets(filterURL);
    setTotalCount(result.totalCount);
    setUsersData(result.gadgetList);
    setIsLoading(false);
  }, [filterAction]);
  const handleSort = useCallback(async (sortBy) => {
    if (!isEmpty(sortBy)) {
      if (sortBy?.[0].id !== "action") {
        try {
          const res = await GadgetService.getTenantGadgetList({
            ...filterAction,
            sortField: sortBy?.[0].id,
            sortOrder: sortBy?.[0].desc ? "desc" : "asc",
          });
          setUsersData(res.gadgetList);
        } catch (ex) { }
      }
    }
  }, []);
  return (
    <LayoutTransition>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="font-semibold text-gray-600 text-md">Users</div>
            <InvolvTenantBreadcrumbs />
          </div>
          <NavLink to="/tenant/config/add-gadgets">
            <InvolvButton classes="items-center flex py-2 justify-end text-xs 2xl:text-sm">
              <PlusIcon className="h-4 w-4 mr-1" /> Add Gadget
            </InvolvButton>
          </NavLink>
        </div>
        <div className="bg-white pt-6 pb-6 px-6 rounded-md shadow mt-5 ">
          {loading ? (
            <Loader customClass="flex justify-center py-5" />
          ) : errorMsg ? (
            <div className="text-red-500 text-xs">{errorMsg}</div>
          ) : (
            <>
              {_.isEmpty(usersData) && !isLoading ? (
                <InvolvTenantNoData />
              ) : (
                <InvolvTenantTable
                  tableTitle={"Gadgets List"}
                  columns={columns}
                  data={usersData || []}
                  isLoading={isLoading}
                  totalCount={totalCount}
                  setFilterAction={setFilterAction}
                  filterAction={filterAction}
                  pageLimit={usersData?.length}
                  handleFilterModal={() => { }}
                  onSortHandle={() => { }}
                  hideSearch={false}
                />
              )}
            </>
          )}
        </div>
      </div>
    </LayoutTransition>
  );
}

export default GadgetList;
