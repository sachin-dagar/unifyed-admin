import Loader from "../../../shared/loader/Loader";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import _, { capitalize, isEmpty } from "lodash";
import moment from "moment";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import InvolvCustomBreadCrumb from "../../../route/InvolvCustomBreadCrumb";
import LayoutTransition from "../../../shared/LayoutTransition";
import InvolvTenantNoData from "../../../shared/InvolvTenantNoData";
import InvolvTenantTable from "../../../shared/InvolvTenantTable";
import InvolvTenantModal from "../../../shared/InvolvTenantModal";
import { generateExcel } from "../../../../util";
import {
  getGDPR,
  deleteGDPRById,
} from "../../../../services/api/gdpr/GDPRService";
import { useAuth } from "../../../../services/api/context/authContext/AuthContext";

const InvolvTosListing = () => {
  const navigate = useNavigate();
  const { tenant } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [dataset, setDataset] = useState({
    data: [],
  });
  const [currentButton, setCurrentButton] = useState(1);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deletingRow, setDeletingRow] = useState({});
  const location = useLocation();

  const [sorting, setSorting] = useState([]);
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
    sortField: "lastUpdatedDate",
    sortOrder: "desc",
    search: "",
    status: "",
  });

  const fetchDataList = async () => {
    if (!isEmpty(location?.state)) {
      try {
        setIsLoading(true);
        try {
          const response = await getGDPR(location?.state);
          if (response?.data?.errorMessage || response?.status === 403) {
            throw new Error(
              response?.data?.errorMessage || "Something went wrong"
            );
          }
          setDataset(response);
          setFilterAction(location?.state);
          const newSortBy = [
            {
              id: location.state.sortBy,
              desc: location.state.sortOrder === "desc" ? true : false,
            },
          ];
          setSorting(newSortBy);
          localStorage.removeItem("TOSFilter");
        } catch (error) {
          toast.error(error?.message || "Something went wrong");
        }
        setIsLoading(false);
      } catch (ex) {
        console.log("error", ex);
        toast.error(ex.message || "Something went wrong");
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        localStorage.removeItem("TOSFilter");
        try {
          const response = await getGDPR(filterAction);
          if (response?.data?.errorMessage || response?.status === 403) {
            throw new Error(
              response?.data?.errorMessage || "Something went wrong"
            );
          }
          setDataset(response);
        } catch (error) {
          toast.error(error?.message || "Something went wrong");
        }
        setIsLoading(false);
      } catch (ex) {
        console.log("error", ex);
        toast.error(ex.message || "Something went wrong");
        setIsLoading(false);
      }
    }
  };

  useEffect(async () => {
    fetchDataList();
  }, [tenant?.tenant]);

  useMemo(async () => {
    try {
      const response = await getGDPR(filterAction);
      if (response?.data?.errorMessage) {
        throw new Error(response?.errorMessage || "Something went wrong");
      }
      setDataset(response);
      localStorage.setItem("TOSFilter", JSON.stringify(filterAction));
    } catch (ex) {
      toast.error(ex.message || "Something went wrong");
    }
  }, [filterAction]);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        disableSortBy: false,
      },
      {
        Header: "Last Modified",
        accessor: "lastUpdatedDate",
        disableSortBy: false,
        Cell: (cell) => {
          return `${moment(cell?.cell?.row?.original?.lastUpdatedDate).format(
            "MMMM Do YYYY, h:mm:ss A"
          )}`;
        },
      },
      {
        Header: "Status",
        accessor: "isActive",
        disableSortBy: false,
        Cell: (cell) => {
          return (
            <div
              className={`font-semibold text-md pl-1 flex items-center ${
                cell?.cell?.row?.original?.isActive
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <div
                className={`w-[6px] h-[6px] rounded-full mr-1 ${
                  cell?.cell?.row?.original?.isActive
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              ></div>
              {cell?.cell?.row?.original?.isActive ? "Active" : "Inactive"}
            </div>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        Cell: (cell) => {
          return (
            <div className="flex gap-3">
              <Link
                to={`/tenant/settings/custom-terms-of-service/edit/${cell?.cell?.row?.original?._id}`}
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
          );
        },
      },
    ],
    []
  );

  const handleFilterModal = useCallback(async (status) => {
    let filterOptions = {};
    if (!_.isEmpty(status)) {
      filterOptions = { ...filterAction, status: status?.value, page: 1 };
      setCurrentButton(1);
    } else {
      filterOptions = { ...filterAction, status: "", page: 1 };
      setCurrentButton(1);
    }
    setFilterAction({ ...filterOptions, page: 1 });
  }, []);

  const handleFilter = useCallback((filter) => {
    if (!_.isEmpty(filter)) {
      setFilterAction({ ...filter });
      setCurrentButton(filter?.page);
    }
  }, []);

  const handleSort = useCallback((filter) => {
    if (!_.isEmpty(filter)) {
      setFilterAction({
        ...filter,
        sortBy: filter?.sortBy[0]?.id,
        sortOrder: filter?.sortBy[0]?.desc ? "desc" : "asc",
      });
      setCurrentButton(filter?.page);
    }
  }, []);

  const handlePageLimit = useCallback(
    (filter) => {
      if (!_.isEmpty(filter)) {
        const totalPage = parseInt(
          dataset?.total / filter?.limit +
            (dataset?.total % filter?.limit > 0 && 1)
        );
        const lastPageNum =
          totalPage < currentButton ? totalPage : currentButton;
        setFilterAction({ ...filter, page: lastPageNum });
        setCurrentButton(lastPageNum);
      }
    },
    [dataset]
  );

  const onDelete = async () => {
    try {
      const response = await deleteGDPRById(deletingRow?._id);
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      if (dataset?.data?.length === 1 && currentButton > 1) {
        setCurrentButton(currentButton - 1);
      } else {
        fetchDataList();
      }
      setDeletingRow({});
      setOpenModalDelete(false);
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const openDeleteModal = (row) => {
    setDeletingRow(row);
    setOpenModalDelete(true);
  };

  const handleExport = async () => {
    const exportDataTable = [];
    for (let row of dataset?.data) {
      exportDataTable.push({
        Title: row?.title,
        "Last Modified": `${moment(row?.lastUpdatedDate).format(
          "MMMM Do YYYY, h:mm:ss A"
        )}`,
        Status: row?.isActive ? "Active" : "Inactive",
      });
    }
    generateExcel("custom-terms-of-service", exportDataTable);
  };

  const dropDownOption = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  const CustomBreadCrumb = [
    { label: "Unite", path: "/" },
    { label: "Settings", path: "/tenant/settings" },
    {
      label: "Custom Terms of Service",
      path: "/tenant/settings/custom-terms-of-service",
    },
  ];

  return (
    <LayoutTransition>
      <div>
        <div className="flex justify-between">
          <InvolvCustomBreadCrumb
            heading="Custom Terms of Service"
            breadcrumbs={CustomBreadCrumb}
          />

          {!isLoading && (
            <div className="flex">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-indigo-900 text-indigo-900 font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white shadow"
                onClick={handleExport}
              >
                <img src="/images/Export.svg" className="h-4 w-4 mr-2" /> Export
              </button>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="flex items-center ml-3 inline-block px-4 py-2 bg-indigo-900 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-indigo-900 hover:shadow-lg focus:bg-indigo-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-900 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => {
                  navigate("/tenant/settings/custom-terms-of-service/add-new");
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add New
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader />
          </div>
        ) : (
          <div className="bg-white py-6 px-6 rounded mt-5">
            <InvolvTenantTable
              tableTitle={"Terms of Service List"}
              tableDescription={
                "You may define multiple Terms of Service through add new button."
              }
              columns={columns}
              data={dataset?.data || []}
              isLoading={isLoading}
              totalCount={dataset?.total}
              pageLimit={dataset?.limit}
              hideSearch={true}
              sorting={sorting}
              setSorting={setSorting}
              filterAction={filterAction}
              setFilterAction={handleFilter}
              onSortHandle={handleSort}
              pageLimitOption={pageLimitOption}
              currentButton={currentButton}
              setPageLimit={handlePageLimit}
              setCurrentButton={setCurrentButton}
              hideDropDown={false}
              dropDownPlaceHolder="Status"
              dropDownOption={dropDownOption}
              handleFilterModal={handleFilterModal}
            />
          </div>
        )}

        {openModalDelete && (
          <InvolvTenantModal
            modalTitle="Delete Custom Terms Of Service"
            modelIcon={<TrashIcon className="w-5 mr-1" />}
            theme="red-400"
            submitDataModal={onDelete}
            openModal={openModalDelete}
            handleModal={() => setOpenModalDelete(!openModalDelete)}
            buttonTitle="Delete"
          >
            <div className="">
              Are you sure you want to delete
              <span className="text-red-400 ml-1">
                {deletingRow?.title || "N/A"}
              </span>
              ?
            </div>
          </InvolvTenantModal>
        )}
      </div>
    </LayoutTransition>
  );
};

export default InvolvTosListing;
