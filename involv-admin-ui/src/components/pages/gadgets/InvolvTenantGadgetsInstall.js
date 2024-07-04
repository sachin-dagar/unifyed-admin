import React, { useState, useEffect } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { useNavigate, useParams } from "react-router-dom";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import moment from "moment";
import toast from "react-hot-toast";
import constants from "../../../constants";
import LayoutTransition from "../../shared/LayoutTransition";

function InvolvTenantGadgetsInstall() {
  const [gadgetTerms, setGadgetTerms] = useState(false);
  const [gadgetDetails, setGadgetDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { tenant } = useAuth();
  const navigate = useNavigate();
  let { gadgetId } = useParams();

  useEffect(async () => {
    const gadgetDetails = await GadgetService.getGadgetByGadgetId(gadgetId);
    setGadgetDetails(gadgetDetails);
  }, [gadgetId]);

  const gadgetConfig = async () => {
    if (gadgetTerms && gadgetDetails?.gadgetId) {
      const gadgetInstallDetails = {
        gadgetId: gadgetDetails?.gadgetId,
        tenantDomain: tenant?.tenant?.tenantDomain,
        tenantGadgetName: gadgetDetails?.gadgetName,
        tenantGadgetIcon: gadgetDetails?.gadgetIcon,
        tenantGadgetDescription: gadgetDetails?.gadgetDescription,
        price: gadgetDetails?.price,
        currency: gadgetDetails?.currency,
        state: "pending",
        releasedOn: gadgetDetails?.releasedOn,
        tenure: "Yearly",
        tenureNumber: 1,
        revisedOn: moment().add(1, "Y").toISOString(), // currentDate + 1 year
        tenantGadgetConfiguration: {}, //empty array
        latestVersion: gadgetDetails?.latestVersion,
        installationType: "auto",
        latestVersionPublished: gadgetDetails?.createdAt,
      };

      try {
        setLoading(true);
        const gadgetInstalled = await GadgetService.installGadget(
          gadgetInstallDetails
        );
        if (gadgetInstalled?.gadgetId) {
          navigate(
            `/tenant/gadgets/${gadgetDetails?.gadgetName}/${gadgetId}`
          );
        } else {
          toast.error("Something went wrong!");
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err?.message || "Something went wrong!");
      }
    } else {
      alert("Plese accept terms and condition before config");
    }
  };

  return (
    <LayoutTransition>
      <div className="bg-white pt-4 px-6 rounded mt-5 border">
        <div className="border-b pb-5">
          <div className="font-medium text-grayInvolv-900 text-base 2xl:text-lg capitalize">
            {gadgetDetails?.gadgetName}
          </div>
          <div className="text-grayInvolv-600 text-sm 2xl:text-base">
            {gadgetDetails?.gadgetDescription}
          </div>
        </div>
        <div className="flex items-center flex-wrap mt-2 mb-2">
          <div className="font-medium text-grayInvolv-900 text-sm 2xl:text-base w-full lg:w-2/6">
            You are about to install {gadgetDetails?.gadgetName} Gadget
          </div>
          <div className="flex items-center mt-1 mb-1">
            <div className="text-center text-xs 2xl:text-sm text-grayInvolv-900">
              <img
                src="/images/gadget-icon2.png"
                className="h-10 w-10 m-auto mb-2"
              />
              {tenant?.tenant?.organizationName}
            </div>
            <img
              src="/images/progress-icon.svg"
              className="h-20 w-20 ml-8 mr-8"
            />
            <div className="text-center text-xs 2xl:text-sm text-grayInvolv-900">
              <img
                src={gadgetDetails?.gadgetIcon}
                className="h-10 w-10 m-auto mb-2"
              />
              {gadgetDetails?.gadgetName}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pt-4 rounded mt-5 border">
        <div className=" px-6 ">
          <div className="font-medium text-grayInvolv-900 text-base 2xl:text-lg mb-5">
            {gadgetDetails?.gadgetName} gadget will be able to
          </div>
          {gadgetDetails?.gadgetPolicySetting?.map((item, index) => (
            <div className="border-b pb-4 mb-4" key={index}>
              <div className="flex">
                <div className="h-4 w-4">
                  {item?.isAccessible ? (
                    <CheckIcon className="mt-1 mr-2 h-4 w-4 text-blue-800" />
                  ) : (
                    <XIcon className="mt-1 mr-2 h-4 w-4 text-red-800" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-grayInvolv-900 text-sm 2xl:text-base mb-1">
                    {item?.policyName}
                  </div>
                  <div className="text-grayInvolv-600 text-sm">
                    {item?.policyDescription}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-grayInvolv-300 px-6 pt-4 pb-4 flex">
          <input
            type="checkbox"
            defaultChecked={gadgetTerms}
            className="mr-2 mt-px border-0 shadow-md"
            onClick={(e) => {
              setGadgetTerms(e.target.checked);
            }}
          />
          <div className="font-normal text-grayInvolv-600 text-sm 2xl:text-base">
            <div className="leading-5">
              After the expiration of your free-trial, the gadget charges will
              get automatically added to your upcoming billing cycle. To know
              more about our pricing policy, please{" "}
              <a href="#" className="text-grayInvolv-900 font-medium underline">
                click here
              </a>
            </div>
            <div className="leading-5 mt-2">
              By installing this gadget you hereby agree to the{" "}
              <a href={constants.TERMSOFUSE_URL} target="_blank" className="text-grayInvolv-900 font-medium underline">
                Engage Marketplace Terms of use
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          onClick={gadgetConfig}
          type="button"
          disabled={loading}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Install
        </button>
        <button
          onClick={() => navigate(-1)}
          type="button"
          disabled={loading}
          className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium text-grayInvolv-900 focus:outline-0 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantGadgetsInstall;
