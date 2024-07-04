import React, { useEffect, useState } from "react";
import _ from "lodash";
import toast from "react-hot-toast";

import InvolvHeader from "../../shared/header/InvolvHeader";
import SideBar from "../../shared/sideBar/Sidebar";
import HeroSection from "../../shared/heroSection/HeroSection";
import Card from "../../shared/card/Card";
import InvolvFooter from "../../shared/footer/InvolvFooter";
import Loader from "../../shared/loader/Loader";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import InvolvTenantPagination from "../../shared/Pagination/InvolvTenantPagination";
import { convertFilterString } from "../../../util";
import LayoutTransition from "../../shared/LayoutTransition";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import { PlusIcon } from "@heroicons/react/outline";

const InvolvGadgetHeader = ({
  active = "popular",
  setActive = () => {},
  searchKeyword,
  setSearchKeyword = () => {},
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-end justify-end my-3 lg:my-0 md:my-0">
      <div className="w-full md:w-auto px-4 md:px-0 py-1 md:py-0">
        <div className="relative text-gray-400 focus-within:text-gray-400 text-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={() => {
                setSearchKeyword("");
              }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-5 h-5 2xl:w-6 2xl:h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            name="q"
            className="h-8 w-full md:w-72 text-sm bg-white rounded pl-10  border-gray-200 focus:border-gray-200 focus:outline-0 focus:shadow-none"
            placeholder="Search Gadget"
            autoComplete="off"
            value={searchKeyword}
            defaultValue={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
          {searchKeyword && (
            <PlusIcon
              onClick={() => {
                setSearchKeyword("");
              }}
              className="w-4 h-4 text-indigo-900 rotate-45 absolute right-2 top-2 flex items-center cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="flex ml-0 lg:ml-10 text-xs font-medium md:ml-10 px-4 md:px-0">
        <div
          className={`flex items-center justify-center h-8 w-24 cursor-pointer ${
            active === "popular" ? "bg-indigo-900" : "border border-indigo-900"
          }`}
          onClick={() => setActive("popular")}
        >
          <span
            className={active === "popular" ? "text-white" : "text-indigo-900"}
          >
            Popular
          </span>
        </div>
        <div
          className={`flex items-center justify-center h-8 w-24 cursor-pointer ${
            active === "newest" ? "bg-indigo-900" : "border border-indigo-900"
          }`}
          onClick={() => setActive("newest")}
        >
          <span
            className={active === "newest" ? "text-white" : "text-indigo-900"}
          >
            Newest
          </span>
        </div>
      </div>
    </div>
  );
};

export default function InvolvGadgetsLanding() {
  const [gadgetList, setGadgetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentButton, setCurrentButton] = useState(1);
  const [activeMenu, setActiveMenu] = useState("newest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sideBarLoading, setSideBarLoading] = useState(true);
  const [gadgetLoading, setGadgetLoading] = useState(true);
  const [filterAction, setFilterAction] = useState({
    page: 1,
    limit: 6,
    sortBy: "asc",
    keyword: "",
    category: "",
  });
  const [categoryListItems, setCategoryListItems] = useState([]);
  const [installedGadget, setInstalledGadget] = useState([]);
  const { tenant } = useAuth();
  let { search } = useLocation();
  const categoryId = search?.split("=")[1];

  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };

  useEffect(async () => {
    let filterURLInstalled = convertFilterString({
      pageNo: 1,
      limit: 100,
    });
    try {
      const installedGadgets = await GadgetService.getTenantGadgetList(
        tenant?.tenant?.tenantDomain,
        filterURLInstalled
      );
      if (installedGadgets?.gadgetList) {
        setInstalledGadget(installedGadgets.gadgetList);
      } else {
        setInstalledGadget([]);
      }
    } catch (err) {
      setInstalledGadget([]);
    }
  }, []);

  useEffect(async () => {
    try {
      setIsLoading(true);
      let filterURL = convertFilterString({
        pageNo: filterAction?.page,
        limit: filterAction?.limit,
        sortBy: activeMenu || filterAction?.sortBy,
        keyword: searchKeyword || filterAction?.keyword,
        category: selectedCategory?._id || filterAction?.category,
      });

      const { gadgetList, totalCount } = await GadgetService.getallGadgets(
        filterURL
      );

      const categoryList = await GadgetService.getAllCategories();

      let allCatFilter = convertFilterString({
        pageNo: filterAction?.page,
        limit: filterAction?.limit,
        sortBy: activeMenu || filterAction?.sortBy,
        keyword: searchKeyword || filterAction?.keyword,
        category: "",
      });

      const { totalCount: allTotalCount } = await GadgetService.getallGadgets(
        allCatFilter
      );


      goToTop();

    const catList =  [ {
        categoryName: "ALL CATEGORIES",
        gadgetInstallCount: categoryList?.reduce((sum, item)=> item?.gadgetInstallCount + sum, 0),
      },
        ...categoryList,
      ]
      setGadgetList(gadgetList);
      setTotalCount(totalCount);
      setCategoryListItems(catList);
      setSideBarLoading(false);
      setIsLoading(false);
      if (categoryId) {
        handleSideBarClick(
          categoryId,
          catList.find((cat) => cat?._id === categoryId)?.categoryName
        );
      }
      setGadgetLoading(false);
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
      setIsLoading(false);
    }
  }, [filterAction, activeMenu, searchKeyword, selectedCategory]);

  const handleSideBarClick = (_id, name) => {
    navigate("/gadget");
    if (_id) {
      setFilterAction({ ...filterAction, page: 1, category: _id });
      setCurrentButton(1);
      setSelectedCategory({ _id: _id, name: name });
      setGadgetLoading(true);
    } else {
      setFilterAction({ ...filterAction, page: 1, category: "" });
      setCurrentButton(1);
      setSelectedCategory({});
      setGadgetLoading(true);
    }
  };
  // if (isLoading) {
  //   return (
  //     <div className="w-full flex justify-center items-center h-96">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <LayoutTransition>
      <div className="bg-white">
        <InvolvHeader />
        <main>
          <HeroSection />
          <div className="py-6 container 3xl:w-[1650px] mx-auto">
            {sideBarLoading && gadgetLoading ? (
              <div className="flex justify-center w-full">
                <Loader height={50} width={50} strokeWidth={3} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 gap-0 md:gap-4 sm:gap-0">
                  <div className="order-first lg:col-span-1 md:col-span-4 sm:col-span-4">
                    <SideBar
                      itemsList={categoryListItems}
                      selectedCategory={selectedCategory}
                      handleClick={handleSideBarClick}
                      isLoading={sideBarLoading}
                    />
                  </div>
                  <div className="w-full col-span-1 lg:col-span-3 md:col-span-4 ml-0 lg:pl-5">
                    {gadgetLoading ? (
                      <div className="flex justify-center items-center h-96">
                        <Loader />
                      </div>
                    ) : (
                      <>
                        <InvolvGadgetHeader
                          active={activeMenu}
                          setActive={setActiveMenu}
                          searchKeyword={searchKeyword}
                          setSearchKeyword={setSearchKeyword}
                        />
                        <div>
                          <p className="text-sm ml-4 md:ml-0">
                            <span className="font-semibold">
                              {totalCount > 0 ? totalCount : ""}{" "}
                            </span>
                            <span className="text-gray-500">
                              {totalCount > 1
                                ? `${
                                    selectedCategory?.name
                                      ? "Items in " + selectedCategory?.name
                                      : "Items in all catergories"
                                  }`
                                : "No Gadgets Available"}
                            </span>
                          </p>
                        </div>
                        <div
                          className={
                            gadgetLoading
                              ? "flex items-center justify-center min-h-572"
                              : "mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-8"
                          }
                        >
                          <Card
                            gadgetList={gadgetList}
                            installedGadget={installedGadget}
                            isLoading={gadgetLoading}
                          />
                        </div>
                        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-4">
                          <div></div>
                          <div className="col-span-5">
                            <div className="flex justify-center my-20 space-x-1 w-full">
                              {!_.isEmpty(gadgetList) && (
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
                </div>
              </>
            )}
          </div>
        </main>
        <InvolvFooter />
      </div>
    </LayoutTransition>
  );
}
