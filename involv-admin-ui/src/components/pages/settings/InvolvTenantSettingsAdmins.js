import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { capitalize, isEmpty, set } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteAdminInviteById,
  getAdminInvite,
} from "../../../services/api/admin/AdminService";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
import InvolvTenantModal from "../../shared/InvolvTenantModal";
import InvolvTenantNoData from "../../shared/InvolvTenantNoData";
import InvolvTenantTable from "../../shared/InvolvTenantTable";
import LayoutTransition from "../../shared/LayoutTransition";
import Loader from "../../shared/loader/Loader";

const InvolvTenantSettingsAdmins = () => {
  const { tenant } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentButton, setCurrentButton] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [filterResult, setFilterResult] = useState(false);
  const [isRestricted, setIsRestricted] = useState(true);
  const [filterAction, setFilterAction] = useState({
    page: currentButton,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "asc",
    keyword: "",
    role: "",
  });
  const [adminsData, setAdminsData] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();

  const [sorting, setSorting] = useState([]);

  const [roles, setRoles] = useState([
    {
      label: "Super Admin",
      value: "Super Admin",
    },
    {
      label: "Tenant Administrator",
      value: "Tenant Administrator",
    },
    {
      label: "Moderator",
      value: "Moderator",
    },
    {
      label: "Technical Staff",
      value: "Technical Staff",
    },
    {
      label: "Advisor",
      value: "Advisor",
    },
  ]);

  const getAllAdminInvitation = async () => {
    try {
      setIsLoading(true);
      if (tenant?.role == "Advisor" || tenant?.role == "Technical Staff") {
        setIsRestricted(true);
      }
      const response = await getAdminInvite({
        page: currentButton,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
        keyword: "",
        role: "",
      });
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      setIsLoading(false);
      setAdminsData(response);
      setIsRestricted(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message || "Something went wrong");
    }
  };

  useEffect(async () => {
    localStorage.removeItem("InviteAdminFilter");
    if (!isEmpty(location?.state)) {
      try {
        setIsLoading(true);
        if (tenant?.role == "Advisor" || tenant?.role == "Technical Staff") {
          setIsRestricted(true);
        }
        const response = await getAdminInvite(location?.state);
        if (response?.data?.errorMessage) {
          throw new Error(
            response?.data?.errorMessage || "Something went wrong"
          );
        }
        setCurrentButton(location?.state?.page);
        setFilterAction(location?.state);
        const newSortBy = [
          {
            id: location.state.sortBy,
            desc: location.state.sortOrder === "desc" ? true : false,
          },
        ];
        setSorting(newSortBy);
        navigate(location.pathname, { state: null });
        setAdminsData(response);
        setIsRestricted(false);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.message || "Something went wrong");
      }
    } else {
      try {
        setIsLoading(true);
        if (tenant?.role == "Advisor" || tenant?.role == "Technical Staff") {
          setIsRestricted(true);
        }
        const response = await getAdminInvite({
          page: currentButton,
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
          keyword: "",
          role: "",
        });
        if (response?.data?.errorMessage) {
          throw new Error(
            response?.data?.errorMessage || "Something went wrong"
          );
        }
        setIsLoading(false);
        setAdminsData(response);
        setIsRestricted(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.message || "Something went wrong");
      }
    }
  }, [tenant?.tenant?.tenantDomain]);

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setOpenModalDelete(true);
  };

  useMemo(async () => {
    try {
      if (tenant?.role == "Advisor" || tenant?.role == "Technical Staff") {
        setIsRestricted(true);
      }
      const response = await getAdminInvite(filterAction);
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      localStorage.setItem("InviteAdminFilter", JSON.stringify(filterAction));
      setAdminsData(response);
      setIsRestricted(false);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [filterAction]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
        Cell: (cell) => {
          return capitalize(cell?.cell?.row?.original?.fullName);
        },
      },
      {
        Header: "Email ID",
        accessor: "email",
        disableSortBy: true,
        Cell: (cell) => {
          return cell?.cell?.row?.original?.email.toLowerCase();
        },
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "CREATION TIME",
        accessor: "createdAt",
        disableSortBy: true,
        Cell: (cell) => {
          const createdAt = new Date(cell?.cell?.row?.original.createdAt);
          if (moment(createdAt.toString()).fromNow().includes("year")) {
            return capitalize(
              `Created ${moment(createdAt.toString()).fromNow()}`
            );
          } else {
            return capitalize(
              `Requested ${moment(createdAt.toString()).fromNow()}`
            );
          }
        },
      },
      {
        Header: "STATUS",
        accessor: "inviteStatus",
        disableSortBy: true,
      },
      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        Cell: (cell) => (
          <div className="flex gap-3">
            <Link
              to={`edit-admin/${cell?.cell?.row?.original?.uuid}`}
              value={cell.accessor}
            >
              <PencilIcon className="h-5 w-5 cursor-pointer" />
            </Link>
            <button
              value={cell.accessor}
              onClick={() => openDeleteModal(cell?.cell?.row?.original)}
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleInviteAdmin = () => {
    navigate("invite-admin");
  };

  const handleSort = useCallback((filter) => {
    if (!_.isEmpty(filter)) {
      setFilterAction({
        ...filter,
        role: filter?.role,
        sortBy: filter?.sortBy[0]?.id ? filter?.sortBy[0]?.id : "createdAt",
        sortOrder: filter?.sortBy[0]?.desc ? "desc" : "asc",
      });
    }
  }, []);

  const handleFilterModal = useCallback(async (role) => {
    if (!_.isEmpty(role)) {
      try {
        const res = await getAdminInvite({
          ...filterAction,
          role: role?.value,
          page: 1,
        });
        setFilterAction({
          ...filterAction,
          role: role?.value,
          page: 1,
        });
        setCurrentButton(1);
        if (res?.data?.errorMessage) {
          throw new Error(res?.errorMessage || "Something went wrong");
        }
        setFilterResult(true);
        setAdminsData(res);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    } else {
      try {
        const response = await getAdminInvite({
          ...filterAction,
          role: "",
          page: 1,
        });
        setFilterAction({
          ...filterAction,
          role: "",
          page: 1,
        });
        setCurrentButton(1);
        if (response?.data?.errorMessage) {
          throw new Error(
            response?.data?.errorMessage || "Something went wrong"
          );
        }
        setAdminsData(response);
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    }
  });

  const handleDeleteInvite = async () => {
    try {
      const response = await deleteAdminInviteById(currentUser?.uuid);
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      setCurrentUser({});
      setOpenModalDelete(false);
      getAllAdminInvitation();
      toast.success("Invitation deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <LayoutTransition>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 items-end min-w-full sm:px-6 lg:px-8">
            <div className="w-full flex items-center justify-between mb-6">
              <InvolvTenantBreadcrumbs />
              {!isRestricted && (
                <div className="flex">
                  {/* <button
                  type="button"
                  className="flex items-center px-4 py-2 border-2 border-blue-600 text-blue-600 font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  <img src="/images/Export.svg" className="h-4 w-4 mr-2" />{" "}
                  Export Admin
                </button> */}
                  <Link
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="flex items-center ml-3 inline-block px-4 py-2 bg-indigo-900 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-indigo-900 hover:shadow-lg focus:bg-indigo-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-900 active:shadow-lg transition duration-150 ease-in-out"
                    to="invite-admin"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" /> Invite Admin
                  </Link>
                </div>
              )}
            </div>
            {isRestricted ? (
              <div className="bg-white py-6 px-6 rounded mt-5 text-center text-indigo-900 shadow-sm">
                {tenant?.role} has no access to invite admin.
              </div>
            ) : (
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white py-6 px-6 w-full">
                {adminsData?.totalCount > 0 || filterResult ? (
                  <InvolvTenantTable
                    tableTitle={"Admins List"}
                    columns={columns}
                    data={adminsData?.data}
                    dropDownPlaceHolder="Roles"
                    handleFilterModal={handleFilterModal}
                    hideDropDown={false}
                    hideSearch={true}
                    isLoading={isLoading}
                    sorting={sorting}
                    setSorting={setSorting}
                    currentButton={currentButton}
                    setCurrentButton={setCurrentButton}
                    totalCount={adminsData?.totalCount}
                    setFilterAction={setFilterAction}
                    dropDownOption={roles}
                    filterAction={filterAction}
                    pageLimit={filterAction?.limit}
                    onSortHandle={handleSort}
                  />
                ) : (
                  <InvolvTenantNoData
                    btnTitle="Invite Admin"
                    btnHandler={handleInviteAdmin}
                  />
                )}
              </div>
            )}
            {openModalDelete && (
              <InvolvTenantModal
                modalTitle="Delete Admin"
                modelIcon={<TrashIcon className="w-5 mr-1" />}
                theme="red-400"
                submitDataModal={handleDeleteInvite}
                openModal={openModalDelete}
                handleModal={() => setOpenModalDelete(!openModalDelete)}
                buttonTitle="Delete"
              >
                <div className="sm:flex sm:items-start">
                  Are you sure you want to delete
                  <span className="text-red-400 ml-1">
                    {currentUser?.fullName}
                  </span>
                  ?
                </div>
              </InvolvTenantModal>
            )}
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
};

export default InvolvTenantSettingsAdmins;
