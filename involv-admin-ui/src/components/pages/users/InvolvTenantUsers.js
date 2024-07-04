import React, { useState, useMemo, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import InvolvTenantTable from "../../shared/InvolvTenantTable";
import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
import InvolvTenantNoData from "../../shared/InvolvTenantNoData";
import _ from "lodash";
import InvolvTenantModal from "../../shared/InvolvTenantModal";
import { UserService } from "../../../services/api/users/UsersService";
import { PlusIcon } from "@heroicons/react/solid";
import InvolvTenantAddUser from "./InvolvTenantAddUser";
import Loader from "../../shared/loader/Loader";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import LayoutTransition from "../../shared/LayoutTransition";
import ReactTooltip from "react-tooltip";

function InvolvTenantUsers() {
  const [openResetModal, setOpenResetModal] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allRoles, setAllRoles] = useState([]);
  const [userRestricted, setUserRestricted] = useState(false);
  const { tenant } = useAuth();
  const [showTable, setShowTable] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [pageLimitOption, setPageLimitOption] = useState([
    {
      label: 5,
      value: 5,
    },
    {
      label: 10,
      value: 10,
    },
    {
      label: 15,
      value: 15,
    },
    {
      label: 20,
      value: 20,
    },
  ]);

  const [filterAction, setFilterAction] = useState({
    page: 1,
    limit: 10,
    sortField: "createdAt",
    sortOrder: "asc",
    roleFilter: [],
    search: "",
    groupName: "",
    userName: "",
  });

  useEffect(async () => {
    try {
      setIsLoading(true);
      setUserRestricted(false);
      const response = await UserService.getallendusers({
        page: 1,
        limit: 10,
        sortField: "createdAt",
        sortOrder: "asc",
        roleFilter: [],
        search: "",
        groupName: "",
        userName: "",
      });
      if (response?.data?.statusCode === 412) {
        setUserRestricted(true);
        toast.error(response?.data?.errorMessage || "Something went wrong!");
      }
      setUsersData(response);
      setIsLoading(false);
      setIsSearching(false);
    } catch (err) {
      setIsLoading(false);
      setIsSearching(false);
      toast.error(err?.message || "Something went wrong!");
    }
  }, [tenant?.tenant]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await UserService.getAllEndUserRoles();
      setAllRoles({
        result: [{ _id: "01", role: "Select all" }, ...response?.result],
      });
      setFilterValue([
        "Select all",
        ...response?.result?.map((roles) => roles.role),
      ]);
    } catch (ex) {
      setIsLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "userId",
        Cell: (props) => {
          const { cell } = props;
          return (
            <>
              {cell?.row?.original?._id && cell?.row?.original?.userId && (
                <>
                  <span
                    className="inline-block w-[100px] text-ellipsis overflow-hidden"
                    data-tip=""
                    data-for={cell?.row?.original?._id}
                  >
                    {cell?.row?.original?.userId}
                  </span>
                  <ReactTooltip
                    id={cell?.row?.original?._id}
                    place="bottom"
                    effect="solid"
                  >
                    {cell?.row?.original?.userId}
                  </ReactTooltip>
                </>
              )}
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "contact",
        Cell: (props) => {
          const { cell } = props;
          return (
            <>
              {cell?.row?.original?.contact?.primaryEmail && (
                <>
                  <span
                    className="inline-block w-[150px] text-ellipsis overflow-hidden"
                    data-tip=""
                    data-for={cell?.row?.original?._id + "email"}
                  >
                    {cell?.row?.original?.contact?.primaryEmail}
                  </span>
                  <ReactTooltip
                    id={cell?.row?.original?._id + "email"}
                    place="bottom"
                    effect="solid"
                  >
                    {cell?.row?.original?.contact?.primaryEmail}
                  </ReactTooltip>
                </>
              )}
            </>
          );
        },
      },
      {
        Header: "Name",
        accessor: "firstName",
      },
      {
        Header: "Gender",
        accessor: "gender",
        disableSortBy: true,
        Cell: (props) => {
          const { cell } = props;
          return cell?.row?.original?.bio?.gender || "";
        },
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        Cell: (props) => {
          const { cell } = props;
          return cell?.row?.original?.accepted ? "accepted" : "pending";
        },
      },
      {
        Header: "Role",
        accessor: "roles",
        disableSortBy: true,
        Cell: (props) => {
          const { value } = props;
          const rolesData = _.map(value, (e, i) => (
            <span key={i}>
              {e}
              {i != value.length - 1 ? "," : ""}{" "}
            </span>
          ));
          return rolesData;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        Cell: (cell) => (
          <button value={cell.accessor} onClick={() => openModalReset(cell)}>
            {/* <LockClosedIcon className="h-5 w-5 cursor-pointer" /> */}
            <img
              src="/images/reset-password.svg"
              className="h-4 w-4 2xl:h-5 2xl:w-5 cursor-pointer"
            />
          </button>
        ),
      },
    ],
    []
  );

  const openModalReset = (cell) => {
    setCurrentUser({ ...cell?.row?.original });
    setOpenResetModal(!openResetModal);
  };

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterValue, setFilterValue] = useState([]);
  const [selectAllRoles, setSelectAllRoles] = useState(true);

  const [currentUser, setCurrentUser] = useState({});

  const handleFilterOnchange = (e) => {
    if (e.target.checked) {
      if (e.target.value === "Select all") {
        setSelectAllRoles(true);
        setFilterValue([...allRoles?.result?.map((role) => role?.role)]);
      } else {
        setFilterValue([...filterValue, e.target.value]);
      }
    } else {
      if (e.target.value === "Select all") {
        setFilterValue([]);
      } else {
        setSelectAllRoles(false);
        setFilterValue(
          filterValue.filter((item) => {
            return item !== e.target.value;
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!selectAllRoles)
      setFilterValue(
        filterValue.filter((item) => {
          return item !== "Select all";
        })
      );
  }, [selectAllRoles]);

  useMemo(async () => {
    try {
      const res = await UserService.getallendusers(filterAction);
      setIsSearching(true);
      setUsersData(res);
    } catch (ex) {
      toast.error(ex.message || "Something went wrong");
    }
  }, [filterAction]);

  const submitFilter = () => {
    if (filterValue.length) {
      handleFilter({ ...filterAction, roleFilter: filterValue, page: 1 });
      setOpenFilterModal(false);
      setCurrentUser({});
    } else {
      handleFilter({ ...filterAction, roleFilter: [], page: 1 });
      setOpenFilterModal(false);
      setCurrentUser({});
    }
  };

  const handleAddUserModal = () => {
    setIsAddUserModalVisible(!isAddUserModalVisible);
    setShowTable(false);
  };

  const refreshAllRolesList = async () => {
    try {
      setIsLoading(true);
      const response = await UserService.getAllEndUserRoles();
      setAllRoles({
        result: [{ _id: "01", role: "Select all" }, ...response?.result],
      });
      setFilterValue([
        "Select all",
        ...response?.result?.map((roles) => roles.role),
      ]);
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  const handleSort = useCallback((filter) => {
    if (!_.isEmpty(filter)) {
      setFilterAction({
        ...filter,
        roleFilter: filter?.roleFilter,
        sortField: filter?.sortBy[0]?.id,
        sortOrder: filter?.sortBy[0]?.desc ? "desc" : "asc",
      });
    }
  }, []);

  const handleFilter = (filter) => {
    if (!_.isEmpty(filter)) {
      setFilterAction({ ...filterAction, ...filter });
      setCurrentButton(filter?.page);
    }
  };

  const handlePageLimit = useCallback(
    (filter) => {
      if (!_.isEmpty(filter)) {
        const totalPage = parseInt(
          usersData?.total / filter?.limit +
            (usersData?.total % filter?.limit > 0 && 1)
        );
        const lastPageNum =
          totalPage < currentButton ? totalPage : currentButton;
        setFilterAction({ ...filterAction, ...filter, page: lastPageNum });
        setCurrentButton(lastPageNum);
      }
    },
    [usersData]
  );

  if (isLoading) {
    return <Loader customClass="w-full flex justify-center py-5 h-96" />;
  }

  return (
    <LayoutTransition>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="font-semibold text-gray-600 text-md">Users</div>
            <InvolvTenantBreadcrumbs />
          </div>
          {!userRestricted && !isLoading && (
            <div className="flex">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-indigo-900 text-indigo-900 font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white shadow"
              >
                <img src="/images/Export.svg" className="h-4 w-4 mr-2" /> Export
                Users
              </button>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="flex items-center ml-3 inline-block px-4 py-2 bg-indigo-900 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-indigo-900 hover:shadow-lg focus:bg-indigo-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-900 active:shadow-lg transition duration-150 ease-in-out"
                onClick={handleAddUserModal}
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add User
              </button>
            </div>
          )}
        </div>
        {userRestricted ? (
          <div className="bg-white py-6 px-6 rounded mt-5 text-center text-indigo-900 shadow-sm">
            Oauth type configurations will be managed through directory!
          </div>
        ) : (
          <div className="bg-white py-6 px-3 rounded mt-5">
            {_.isEmpty(usersData.result) && !isSearching && !isLoading ? (
              <InvolvTenantNoData btnHandler={handleAddUserModal} />
            ) : (
              <InvolvTenantTable
                tableTitle={"Users List"}
                searchPlaceholder={`UserId, email and name`}
                columns={columns}
                data={usersData.result || []}
                isLoading={isLoading}
                pageLimitOption={pageLimitOption}
                currentButton={currentButton}
                setPageLimit={handlePageLimit}
                setCurrentButton={setCurrentButton}
                totalCount={usersData?.total}
                setFilterAction={handleFilter}
                filterAction={filterAction}
                pageLimit={usersData?.limit}
                allRoles={allRoles}
                handleFilterModal={() => setOpenFilterModal(!openFilterModal)}
                onSortHandle={handleSort}
              />
            )}
          </div>
        )}

        {openResetModal && (
          <InvolvTenantModal
            openModal={openResetModal}
            handleModal={openModalReset}
            buttonTitle="Yes"
            width="96"
          >
            <div className="sm:flex sm:items-start">
              <div className=" ">
                <img
                  src="/images/reset-password.svg"
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Reset Password
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to send email to
                    {currentUser?.contact?.primaryEmail ? (
                      <>
                        {" "}
                        <span className="text-indigo-900">
                          {currentUser?.contact?.primaryEmail}
                        </span>{" "}
                        to{" "}
                      </>
                    ) : (
                      " "
                    )}
                    reset password?
                  </p>
                </div>
              </div>
            </div>
          </InvolvTenantModal>
        )}
        {openFilterModal && (
          <InvolvTenantModal
            openModal={openFilterModal}
            modalTitle="Filter By Role"
            buttonTitle="Proceed"
            btnColor="bg-red-400"
            handleModal={() => setOpenFilterModal(!openFilterModal)}
            submitDataModal={submitFilter}
            width="lg"
          >
            <div className="flex flex-wrap sm:justify-between sm:flex sm:items-start pl-3">
              {allRoles?.result.map((el) => (
                <div className="w-1/3 mb-4 cursor-pointer flex items-center mr-10">
                  <input
                    type="checkbox"
                    checked={
                      filterValue?.find((subItem) => subItem == el.role) ||
                      false
                    }
                    className="cursor-pointer"
                    value={el?.label || el?.role}
                    defaultChecked={
                      filterAction?.roleFilter?.find(
                        (subItem) => subItem == el.role
                      ) || false
                    }
                    onChange={(e) => handleFilterOnchange(e)}
                  />
                  <span className="px-2">{el.role}</span>
                </div>
              ))}
            </div>
          </InvolvTenantModal>
        )}
        <InvolvTenantAddUser
          showTable={showTable}
          setShowTable={setShowTable}
          handleFilter={handleFilter}
          filterAction={filterAction}
          handleAddUserModal={handleAddUserModal}
          isAddUserModalVisible={isAddUserModalVisible}
          allRoles={allRoles?.result}
          refreshAllRolesList={refreshAllRolesList}
        />
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantUsers;
