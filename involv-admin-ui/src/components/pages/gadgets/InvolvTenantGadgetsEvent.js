import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import InvolvTenantGadgetsConfig from "./InvolvTenantGadgetsConfig";
import { LockOpenIcon } from "@heroicons/react/solid";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import InvolvTenantGadgetsPermission from "./InvolvTenantGadgetsPermission";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import { useLocation, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import Loader from "../../shared/loader/Loader";
import { isEmpty } from "lodash";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import { createSearchParams, useSearchParams } from "react-router-dom";
import LayoutTransition from "../../shared/LayoutTransition";

function InvolvTenantGadgetsEvent() {
  const [loading, setLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [gadgetDetails, setGadgetDetails] = useState({});
  const { tenant } = useAuth();
  let { gadgetId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("cnf");

  const navigator = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const gadgetDetails =
        await GadgetService.getInstallGadgetDetailByGadgetId(gadgetId);
      if (gadgetDetails?.status === 400) {
        navigator("/tenant/gadgets");
      }
      setGadgetDetails(gadgetDetails);
      if (!isEmpty(gadgetDetails?.gadgetMasterInfo?.gadgetAttributeMap)) {
        setCurrentTab("cnf");
      } else if (isEmpty(gadgetDetails?.gadgetMasterInfo?.gadgetAttributeMap)) {
        setCurrentTab("prm");
      }
      setLoading(false);
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
      setLoading(false);
    }
  }, [gadgetId, tenant?.tenant?.tenantDomain]);

  const publishGadget = async () => {
    try {
      setPublishLoading(true);
      const result = await GadgetService.updateGadgetConfig(
        gadgetDetails?._id,
        {
          state: "published",
        }
      );
      if (result?.status === 400) {
        throw new Error(result?.data?.errorMessage || "Something went wrong");
      }
      if (result?.gadgetId) {
        setGadgetDetails(result);
        toast.success("Gadget published successfully!");
      } else {
        toast.error("Something went wrong!");
      }
      setPublishLoading(false);
    } catch (err) {
      setPublishLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  const getComponent = {
    cnf: (
      <InvolvTenantGadgetsConfig
        setCurrentTab={setCurrentTab}
        gadgetDetails={gadgetDetails}
        setGadgetDetails={setGadgetDetails}
      />
    ),
    prm: (
      <InvolvTenantGadgetsPermission
        gadgetDetails={gadgetDetails}
        publishGadget={publishGadget}
      />
    ),
  };

  if (loading) {
    return (
      <div className="flex mb-5 mt-7 h-96 justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <LayoutTransition>
      <div className="bg-white pt-4 px-6 rounded mt-5 border">
        <div className="flex justify-between">
          <div className="pb-5 w-2/3">
            <div className="font-medium text-grayInvolv-900 text-base 2xl:text-lg">
              {gadgetDetails?.tenantGadgetName} Settings
            </div>
            <div className="text-grayInvolv-600 text-sm 2xl:text-base">
              {gadgetDetails?.tenantGadgetDescription}
            </div>
          </div>
          <div className="w-1/4 text-right flex justify-end  items-center h-fit">
            <div className="font-medium mr-6 text-grayInvolv-900 text-xs">
              Ver {gadgetDetails?.latestVersion}
            </div>
            <StarRatings
              rating={4.1}
              starSpacing="1px"
              starRatedColor="#FF9500"
              starDimension="14px"
            />
            <div className="ml-1 text-grayInvolv-900 text-xs italic">4.1</div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap w-full">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none mb-4 flex-row border-b"
                role="tablist"
              >
                {!isEmpty(
                  gadgetDetails?.gadgetMasterInfo?.gadgetAttributeMap
                ) && (
                  <li className="items-center">
                    <a
                      className={
                        "whitespace-nowrap flex py-2 px-5  font-medium text-sm flex items-center " +
                        (currentTab === "cnf"
                          ? "border-indigo-500 text-indigo-600 border-b-2 border-indigo-600 shadow-3xl bg-gray-100"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 text-grayInvolv-600")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab("cnf");
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      <div>
                        <AdjustmentsIcon className="h-5 w-5 " />
                      </div>
                      <div
                        className={
                          "ml-1 leading-7 text-sm " +
                          (currentTab === "cnf"
                            ? "text-grayInvolv-900"
                            : "text-grayInvolv-600")
                        }
                      >
                        Configuration
                      </div>
                    </a>
                  </li>
                )}
                <li className="md:w-36 items-center ">
                  <a
                    className={
                      "whitespace-nowrap flex py-2 px-5  font-medium text-sm flex items-center  " +
                      (currentTab === "prm"
                        ? "border-indigo-500 text-indigo-600 border-b-2 border-indigo-600 shadow-3xl bg-gray-100"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 text-grayInvolv-600")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentTab("prm");
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    <div>
                      <LockOpenIcon className="h-5 w-5 " />
                    </div>
                    <div
                      className={
                        "ml-1 leading-7 text-sm " +
                        (currentTab === "prm"
                          ? "text-grayInvolv-900"
                          : "text-grayInvolv-600")
                      }
                    >
                      Permissions
                    </div>
                  </a>
                </li>
              </ul>
              <div className="tab-content tab-space">
                {getComponent[currentTab]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantGadgetsEvent;
