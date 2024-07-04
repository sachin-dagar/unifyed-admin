import React, { useState, useMemo, useEffect, useCallback } from "react";
import { isEmpty } from "lodash";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import InvolvTenantTable from "../../../shared/InvolvTenantTable";
import InvolvTenantNoData from "../../../shared/InvolvTenantNoData";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  deleteDirectory,
  getAllDirectoryData,
} from "../../../../services/api/directory/DirectoryService";
import { Link } from "react-router-dom";
import { UserService } from "../../../../services/api/users/UsersService";
import LayoutTransition from "../../../shared/LayoutTransition";
import Loader from "../../../shared/loader/Loader";
import { useAuth } from "../../../../services/api/context/authContext/AuthContext";

function InvolvTenantDirectoryList() {
  const [usersData, setUsersData] = useState([]);
  const { tenant } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();
  const [filterAction, setFilterAction] = useState({
    page: 1,
    limit: 10,
    sortField: "userId",
    sortOrder: "asc",
    roleFilter: [],
    search: "",
    groupName: "",
    userName: "",
  });

  const getDirectoryList = async () => {
    try {
      const directoryData = await getAllDirectoryData();
      if (directoryData?.status === 400) {
        throw new Error(
          directoryData?.data?.errorMessage || "Something went wrong"
        );
      }
      if (directoryData.length > 0) {
        setUsersData(directoryData);
      } else {
        setUsersData([])
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  useEffect(getDirectoryList, [tenant?.tenant?.tenantDomain]);

  const openModalReset = async (values) => {
    try {
      const result = await deleteDirectory(values?._id);
      if (result?.status === 400) {
        throw new Error(result?.data?.errorMessage || "Something went wrong");
      }
      getDirectoryList();
      toast.success("Directory deleted successfully!");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Connection Name",
        accessor: "connectionName",
        disableSortBy: true,
      },
      {
        Header: "Directory Type",
        accessor: "isActiveDirectory",
        disableSortBy: true,
        Cell: (cell) => {
          return (
            <div className="flex gap-3">{cell?.value ? "AD" : "LDAP"}</div>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        Cell: (cell) => (
          <div className="flex gap-3">
            <Link
              to={`directory-configuration/${cell?.cell?.row?.original?._id}`}
              value={cell.accessor}
            >
              <PencilIcon className="h-5 w-5 cursor-pointer" />
            </Link>
            <button
              value={cell.accessor}
              onClick={() => openModalReset(cell?.cell?.row?.original)}
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterValue, setFilterValue] = useState([]);

  const handleFilterOnchange = (e) => {
    if (e.target.checked) {
      setFilterValue([...filterValue, e.target.value]);
    } else {
      setFilterValue(filterValue.filter((item) => item !== e.target.value));
    }
  };

  const submitFilter = () => {
    if (filterValue.length) {
      setFilterAction({ ...filterAction, roleFilter: filterValue, page: 1 });
      setOpenFilterModal(false);
    } else {
    }
  };

  const handleSort = useCallback(async (sortBy) => {
    if (!isEmpty(sortBy)) {
      if (sortBy?.[0].id !== "action") {
        try {
          const res = await getAllDirectoryData({
            ...filterAction,
            sortField: sortBy?.[0].id,
            sortOrder: sortBy?.[0].desc ? "desc" : "asc",
          });
          setUsersData(res);
        } catch (ex) {}
      }
    }
  }, []);

  const handleAddNewDirectory = () => {
    navigator("directory-configuration");
  };

  return (
    <LayoutTransition>
      <div>
        <div className="flex justify-end">
          <div className="flex">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex items-center inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out m-auto mt-4"
              onClick={handleAddNewDirectory}
            >
              <PlusIcon className="h-4 w-4 mr-2" /> Add New Directory
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader />
          </div>
        ) : (
          <div className="bg-white py-6 px-6 rounded mt-5">
            {isEmpty(usersData) ? (
              <InvolvTenantNoData
                btnTitle="Add New Directory"
                btnHandler={handleAddNewDirectory}
              />
            ) : (
              <InvolvTenantTable
                tableTitle={"Directory List"}
                columns={columns}
                data={usersData || []}
                isLoading={isLoading}
                totalCount={usersData.length}
                setFilterAction={setFilterAction}
                filterAction={filterAction}
                pageLimit={usersData.length}
                handleFilterModal={() => setOpenFilterModal(!openFilterModal)}
                onSortHandle={handleSort}
                hideSearch={true}
              />
            )}
          </div>
        )}
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantDirectoryList;
