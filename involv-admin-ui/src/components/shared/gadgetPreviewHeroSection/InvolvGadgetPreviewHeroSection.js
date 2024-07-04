import React, { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  CubeTransparentIcon,
  ColorSwatchIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router";

import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import InvolvButton from "../InvolvButton";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import { convertFilterString } from "../../../util";
import { Link } from "react-router-dom";
import { capitalize } from "lodash";

export default function InvolvGadgetPreviewHeroSection({
  gadgetId,
  category,
  gadgetName,
  gadgetPublisherName,
  gadgetIcon,
  gadgetCompatible,
  installCount,
  gadgetReviewCount,
  latestVersion,
  rating,
  websiteUrl,
  price,
  gadgetPublisherURL
}) {
  const { loggedIn } = useAuth();
  const [isInstalled, setIsInstalled] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const { tenant } = useAuth();

  useEffect(async () => {
    (async () => {
      let filterURLInstalled = convertFilterString({
        pageNo: 1,
        limit: 100,
      });
      setApiLoaded(false);
      const installedGadgets = await GadgetService.getTenantGadgetList(
        tenant?.tenant?.tenantDomain,
        filterURLInstalled
      );

      const installedGadget = installedGadgets?.gadgetList?.find(
        (gadget) => gadget.gadgetId === gadgetId
      );
      setApiLoaded(true);
      if (installedGadget) {
        setIsInstalled(true);
      }
    })();
  }, []);

  const navigate = useNavigate();

  const selectedProduct = () => {
    if (!loggedIn) {
      navigate(`/login?gadgetId=${gadgetId}`);
    } else navigate(`/tenant/gadgets/install/${gadgetName}/${gadgetId}`);
  };

  return (
    <div>
      <div className="w-full h-full overflow-hidden bg-fixed border">
        <div className="grid grid-cols-5   my-5 lg:my-8  3xl:w-[1650px]  mx-5 lg:mx-40 mt-10 mb-20">
          <div className="col-span-5 lg:col-span-2">
            <nav className="bg-grey-light rounded-md w-full my-3 text-sm 2xl:text-base">
              <ol className="list-reset flex">
                <li>
                  <Link
                    to="/gadget"
                    className="text-blueInvolv-600 font-semibold text-sm hover:text-blue-700"
                  >
                    All Categories
                  </Link>
                </li>
                <li>
                  <span className="text-gray-500 mx-2">{">"}</span>
                </li>
                <li>
                  <Link
                    to={`/gadget?categoryId=${category[0]?._id}`}
                    className="text-blueInvolv-600 font-semibold text-sm hover:text-blue-700"
                  >
                    {capitalize(category[0]?.categoryName)}
                  </Link>
                </li>
                <li>
                  <span className="text-gray-500 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500">
                  <span className="text-xs font-semibold mt-2">
                    {gadgetName}
                  </span>
                </li>
              </ol>
            </nav>
            <div className="grid grid-cols-3 my-5">
              <div className="col-span-1 h-24 w-24">
                <img
                  className="object-cover h-full w-full"
                  src={
                    gadgetIcon ||
                    `https://i0.wp.com/www.clir.org/wp-content/uploads/sites/6/2016/09/app-icon-1024x1024.png?ssl=1`
                  }
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <p className="my-1">
                  <span className="font-semibold text-lg 2xl:text-xl capitalize">
                    {gadgetName}{" "}
                  </span>
                  <span className="text-xs font-semibold text-grayInvolv-500">
                    by{" "}
                  </span>
                  <span className="text-xs text-blueInvolv-600 underline">
                    {gadgetPublisherName}
                  </span>
                </p>
                <p className="my-1">
                  <span className="text-xs 2xl:text-sm font-medium text-gray-500">
                    {installCount} + installs &bull; {gadgetReviewCount} reviews
                    &bull; Version {latestVersion}{" "}
                  </span>
                </p>

                <div className="flex justify-start items-center my-1">
                  <ul className="flex justify-start">
                    {[1, 2, 3, 4, 5]?.map((item, i) => {
                      if (i < parseInt(rating)) {
                        return (
                          <li key={i}>
                            <img
                              className="h-8 w-auto md:h-9 2xl:h-10 mr-2"
                              src="/images/star-full.svg"
                              alt=""
                            />
                          </li>
                        );
                      }
                      return (
                        <li key={i}>
                          <img
                            className="h-8 w-auto md:h-9 2xl:h-10"
                            src="/images/star-full.svg"
                            alt=""
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <span className="text-gray-400 text-lg font-semibold italic ml-4">
                    {rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 lg:col-span-1 flex flex-col justify-end py-5">
            {gadgetCompatible.length > 0 && (
              <div className="border-l-2 px-5">
                <p className="text-xs text-gray-400 font-medium text-left">
                  Compatible With
                </p>
                <div className="flex flex-row my-2">
                  {gadgetCompatible.map((compatiable) => (
                    <div
                      key={compatiable?._id}
                      className="h-7 w-7 2xl:h-8 2xl:w-8 mr-2"
                    >
                      <img src={compatiable?.icon} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-span-5 lg:col-span-2 flex flex-col justify-center items-start px-1 lg:px-5">
            <p className="text-xs text-gray-400 font-medium">Publisher</p>
            <div className="border w-full p-3 my-2 relative">
              <p className="text-gray-600 font-medium flex flex-row text-sm 2xl:text-base">
                <GlobeAltIcon className="text-gray-400 h-5 w-5 2xl:h-6 2xl:w-6 mr-2" />
                <a href={`https://${gadgetPublisherURL}`} target="_blank" rel="noopener noreferrer external" className="cursor-pointer">
                  {gadgetPublisherURL}
                </a>
              </p>
              <p className="text-gray-500 font-medium text-xs mt-2">
                Visit this website
              </p>
              <ChevronRightIcon className="absolute top-6 right-5 h-6 w-6 text-gray-400" />
            </div>
            {apiLoaded && (
              <div className="flex space-x-2 justify-end w-full">
                {!isInstalled ? (
                  <button
                    type="button"
                    onClick={selectedProduct}
                    className="inline-block 
                                    px-6 py-2 bg-blueInvolv-600 
                                    text-white font-medium 
                                    text-xl leading-tight 
                                    uppercase shadow-md 
                                    hover:bg-blue-700 hover:shadow-lg 
                                    focus:bg-blue-700 focus:shadow-lg 
                                    focus:outline-none focus:ring-0 
                                    active:bg-blue-800 active:shadow-lg 
                                    transition duration-150 ease-in-out"
                  >
                    $ {price}
                  </button>
                ) : (
                  <span className="italic text-green-500 font-semibold flex items-center mt-3 select-none">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-1" />
                    Installed
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
