import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

import InvolvRadioInput from "../radioInput/InvolvRadioInput";
import Loader from "../loader/Loader";

export default function SideBar({
  itemsList,
  handleClick,
  selectedCategory,
  isLoading,
}) {
  const [showCategories, setShowCategories] = useState(false);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="block lg:hidden">
            <div className="border border-gray-200 mx-4 md:mx-0 rounded">
              <div
                className={`flex py-4
                px-5 text-base cursor-pointer text-left border-0
                rounded-none
                transition
                focus:outline-none items-center justify-between`}
                onClick={() => {
                  setShowCategories(!showCategories);
                }}
              >
                <div>
                  <p> ALL CATEGORIES </p>
                </div>
                <button>
                  {showCategories ? (
                    <ChevronUpIcon className="w-5 h-5 text-blue-600"></ChevronUpIcon>
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-800"></ChevronDownIcon>
                  )}
                </button>
              </div>
              {showCategories && itemsList && itemsList.length > 0
                ? itemsList.map((item, i) => {
                    if (item.categoryName === "") return <></>;
                    return (
                      <div
                        className="flex items px-5 justify-around my-6 text-gray-600"
                        key={i}
                      >
                        <span className="">
                          <InvolvRadioInput
                            name={`${item.categoryName}_${i}`}
                            id={`${item.categoryName}_${i}`}
                            label={item.categoryName}
                            handleClick={handleClick}
                            checked={
                              selectedCategory?._id === item._id ? true : false
                            }
                            _id={item._id}
                          />
                        </span>
                        <span className="ml-auto text-right text-xs 2xl:text-sm text-gray-400">
                          {item.gadgetInstallCount}
                        </span>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="bg-gray-50 h-full p-5 hidden lg:block w-full">
            {itemsList && itemsList.length > 0
              ? itemsList.map((item, i) => {
                  if (item.categoryName === "") return <></>;
                  return (
                    <div className="my-6 text-gray-600 flex" key={i}>
                      <span className="">
                        <InvolvRadioInput
                          name={`${item.categoryName}_${i}`}
                          id={`${item.categoryName}_${i}`}
                          label={item.categoryName}
                          handleClick={handleClick}
                          checked={
                            selectedCategory?._id === item._id ? true : false
                          }
                          _id={item._id}
                        />
                      </span>
                      <span className="ml-auto text-right text-xs 2xl:text-sm text-gray-400">
                        {item.gadgetInstallCount}
                      </span>
                    </div>
                  );
                })
              : ""}
          </div>
        </>
      )}
    </>
  );
}
