import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { useTable, useSortBy } from "react-table";
import Loader from "./loader/Loader";
import InvolvTenantPagination from "./Pagination/InvolvTenantPagination";
import _, { isEmpty } from "lodash";
import "react-dropdown/style.css";
import ReactSelect from "react-select";
import { SortA, SortB } from "../../AppIcons";
import Select from "react-select";
import InvolvTenantNoDataInTable from "./InvolvTenantNoDataInTable";

function InvolvTenantTable({
  tableTitle,
  tableDescription,
  data,
  columns,
  isLoading,
  currentButton,
  setCurrentButton,
  dropDownOption,
  filterAction,
  totalCount,
  sorting = [],
  setSorting = () => {},
  pageLimit,
  setPageLimit,
  pageLimitOption,
  handleFilterModal,
  pagination = true,
  dropDownPlaceHolder = "",
  setFilterAction,
  onSortHandle,
  hideDropDown = true,
  hideSearch = false,
  searchPlaceholder,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSortBy,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
    },
    useSortBy
  );

  const searchTable = (e) => {
    setFilterAction({
      ...filterAction,
      search: e.target.value,
      page: 1,
    });
  };

  const searchDebouce = _.debounce(searchTable, 500);

  useEffect(() => {
    if (!isEmpty(sorting)) {
      setSortBy(sorting);
      setSorting([]);
      onSortHandle({ ...filterAction, sortBy: sorting });
    } else {
      onSortHandle({ ...filterAction, sortBy });
    }
  }, [onSortHandle, sortBy, ...sorting]);

  const handlePageLimit = (pageObj) => {
    setPageLimit({ ...filterAction, limit: pageObj?.value });
  };

  return (
    <>
      <div className="mb-6 flex justify-between">
        <div>
          <h4 className="font-medium text-grayInvolv-900 text-lg 2xl:text-xl">
            {tableTitle}
          </h4>
          {tableDescription && (
            <span className="text-xs font-medium text-gray-500 hover:text-gray-700">
              {tableDescription}
            </span>
          )}
        </div>

        {!hideSearch && (
          <div className="flex justify-end items-center">
            <button
              className="border rounded mr-3 px-2 py-2 cursor-pointer"
              onClick={handleFilterModal}
            >
              <img
                src="/images/filter.svg"
                className="  h-6 w-6 text-gray-400"
              />
            </button>
            <div className="w-full">
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-sm pb-2 pt-2"
                  placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
                  onChange={searchDebouce}
                />
              </div>
            </div>
          </div>
        )}

        {!hideDropDown && (
          <div className="flex justify-end items-center">
            <div className="w-28">Filter by:</div>
            <div className="w-full">
              <ReactSelect
                isClearable
                type="select"
                name="filterDropDown"
                className="react-select__input react-select__control"
                placeholder={dropDownPlaceHolder}
                styles={{
                  input: (provider, state) => ({
                    ...provider,
                    height: "38px",
                    opacity: 0,
                  }),
                }}
                options={dropDownOption}
                onChange={(res) => {
                  handleFilterModal(res);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {!isEmpty(data) ? (
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg min-h-500">
                <>
                  <table
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-200"
                  >
                    <thead className="bg-slate-300">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup?.headers?.map((column) => (
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              className="px-4 py-3 text-left text-xs 2xl:text-base font-medium text-grayInvolv-900 uppercase tracking-wider"
                            >
                              <div className="flex items-center gap-1">
                                {column.render("Header")}
                                <span className="w-5">
                                  {column.canSort ? (
                                    column.isSortedDesc ? (
                                      <SortA
                                        className={`w-3 h-3 mr-3 ${
                                          column?.isSorted
                                            ? "text-indigo-900"
                                            : "text-gray-400"
                                        }`}
                                      />
                                    ) : (
                                      <SortB
                                        className={`w-3 h-3 mr-3 ${
                                          column?.isSorted
                                            ? "text-indigo-900"
                                            : "text-gray-400"
                                        }`}
                                      />
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>

                    <tbody
                      {...getTableBodyProps()}
                      className="bg-white divide-y divide-gray-200"
                    >
                      {isLoading ? (
                        <tr>
                          <th colSpan={6}>
                            <Loader customClass="w-full flex justify-center py-5" />
                          </th>
                        </tr>
                      ) : (
                        rows?.map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row?.cells?.map((cell) => {
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    className="px-4 py-2 2xl:py-3 whitespace-nowrap text-sm 2xl:text-base text-grayInvolv-900"
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-500">
                <InvolvTenantNoDataInTable />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {!_.isEmpty(data) && pagination && (
            <InvolvTenantPagination
              currentButton={currentButton}
              data={data}
              pagelimit={pageLimit}
              setPageLimit={setPageLimit}
              pageLimitOption={pageLimitOption}
              setCurrentButton={setCurrentButton}
              pages={totalCount / pageLimit + (totalCount % pageLimit > 0 && 1)}
              setFilterAction={setFilterAction}
              filterAction={filterAction}
            />
          )}

          {!isEmpty(pageLimitOption) && !isEmpty(data) && (
            <div className="flex items-center justify-end w-full mt-5">
              <label className="mr-3">Page Limit</label>
              <Select
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state?.isFocused ? "#3246D3" : "",
                  }),

                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state?.isSelected ? "#3246D3" : "",
                    ":hover": {
                      backgroundColor: "#eef2fe",
                    },
                  }),
                }}
                isSearchable={false}
                onChange={handlePageLimit}
                menuPosition="fixed"
                value={pageLimitOption.find((page) => page.value === pageLimit)}
                options={pageLimitOption}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InvolvTenantTable;
