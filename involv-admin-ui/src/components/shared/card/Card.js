import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function Card({ gadgetList, installedGadget }) {
  const navigate = useNavigate();

  const productRedirect = (gadgetId) => {
    navigate(`/gadget/${gadgetId}`);
  };

  return gadgetList && gadgetList.length > 0
    ? gadgetList.map((card, i) => {
        const isInstalled = !!installedGadget?.find(
          (item) => item.gadgetId === card.gadgetId
        );
        return (
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => {
              productRedirect(card?.gadgetId);
            }}
            key={card?.gadgetId?.toString()}
          >
            <div className="border bg-white max-w-sm">
              <div className="relative">
                <img className="" src={`${card.gadgetIcon}`} alt="" />
                <div className="absolute text-white font-bold text-xl top-0 left-0 h-full w-full p-2 bg-gray-800 bg-opacity-10">
                  <p className="text-xs text-right">V {card?.latestVersion}</p>
                  <div className="flex h-5/6 w-full justify-center items-center">
                    {card?.gadgetName}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-lg 2xl:text-xl text-gray-800 font-semibold mb-2">
                  {card?.gadgetName}
                </h5>
                <p className="font-normal text-gray-800 text-sm mb-2">
                  {card?.gadgetDescription}
                </p>

                <div className="grid grid-cols-2 mt-4">
                  <div className="flex justify-start align-center">
                    {card?.compatible?.map((item, i) => {
                      return (
                        <div className="h-6 w-6 2xl:h-8 2xl:w-8 mr-2" key={i}>
                          <img
                            className="text-indigo-500"
                            src={item?.icon}
                            alt={item?._id}
                            title={item?.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end items-center">
                    <ul className="flex justify-center">
                      {[1, 2, 3, 4, 5]?.map((item, i) => {
                        if (i < parseInt(card?.rating)) {
                          return (
                            <li key={i}>
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="star"
                                className="w-2 text-yellow-500 mr-1"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                ></path>
                              </svg>
                            </li>
                          );
                        }
                        return (
                          <li key={i}>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="far"
                              data-icon="star"
                              className="w-2 text-yellow-500 mr-1"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                              ></path>
                            </svg>
                          </li>
                        );
                      })}
                    </ul>
                    <span className="text-gray-400 text-xs font-semibold italic ml-2">
                      {parseInt(card?.rating)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <div className="flex items-center">
                    <p className="text-gray-700 text-xs font-medium">
                      {card?.installCount}+ installs
                    </p>
                  </div>
                  {isInstalled ? (
                    <div className="flex items-center justify-end">
                      <span className="italic text-green-500 font-semibold flex items-center mt-3 select-none">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-1" />{" "}
                        Installed
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end">
                      <p className="text-gray-500 text-lg 2xl:text-xl font-semibold">
                        {card?.currency == "USD" ? "$" : "Rs"} {card?.price}{" "}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })
    : null;
}
