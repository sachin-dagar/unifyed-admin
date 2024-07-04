import React, { useEffect, useMemo, useState } from "react";
import InvolvTenantGadgetsPermissionSidebar from "./InvolvTenantGadgetsPermissionSidebar";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import InvolvSwitchButton from "../../shared/InvolvSwitchButton";
import { InformationCircleIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import { useNavigate, useParams } from "react-router";
import {
  deletePermissionRoles,
  GadgetService,
} from "../../../services/api/gadget/GadgetService";
import { isEmpty } from "lodash";
import Loader from "../../shared/loader/Loader";
import InvolvButton from "../../shared/InvolvButton";
import ReactTooltip from "react-tooltip";

function InvolvTenantGadgetsPermission({ gadgetDetails, publishGadget }) {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeUser, setActiveUser] = useState("all");
  const [selectedRole, setSelectedRole] = useState([]);
  const [gadgetUserPermissions, setGadgetUserPermissions] = useState([]);
  const { gadgetId } = useParams();
  const { tenant } = useAuth();

  const navigator = useNavigate();

  useEffect(async () => {
    try {
      if (gadgetId && tenant?.tenant?.tenantDomain) {
        setLoading(true);
        const gadgetDetails = await GadgetService.getGadgetUserPermission(
          gadgetId,
          tenant?.tenant?.tenantDomain
        );
        const selectedRoles = gadgetDetails?.map((item) => item?.role) || [];
        setSelectedRole(selectedRoles);
        setGadgetUserPermissions(gadgetDetails);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  }, [gadgetId, tenant?.tenant]);

  const userPermissionDetails = gadgetUserPermissions?.find(
    (item) => item?.role === activeUser
  );

  const updateIsViewbale = () => {
    const updatedUserPermission = gadgetUserPermissions?.map((item) => {
      if (item?.role === activeUser) {
        let updateItem = item;
        // if (item?.isViewable) {
        //   updateItem = {
        //     ...updateItem,
        //     gadgetFeature: updateItem?.gadgetFeature?.map((feature) => {
        //       return {
        //         ...feature,
        //         featureHeaderValue: false,
        //         featureSubHeader: feature?.featureSubHeader.map((subHeader) => {
        //           return {
        //             ...subHeader,
        //             value: false,
        //           };
        //         }),
        //       };
        //     }),
        //   };
        // }
        return {
          ...updateItem,
          isViewable: !item?.isViewable,
        };
      }
      return item;
    });
    setGadgetUserPermissions(updatedUserPermission);
  };

  const updateFeaturedValue = (changeFeaturedIndex) => {
    const updatedUserPermission = gadgetUserPermissions?.map((item) => {
      if (item?.role === activeUser) {
        return {
          ...item,
          gadgetFeature: item?.gadgetFeature?.map((featuredVal, index) => {
            if (changeFeaturedIndex === index) {
              let updatedfeaturedVal = featuredVal;
              if (featuredVal?.featureHeaderValue) {
                updatedfeaturedVal = {
                  ...updatedfeaturedVal,
                  featureSubHeader: featuredVal?.featureSubHeader?.map(
                    (featuredSubVal) => {
                      return {
                        ...featuredSubVal,
                        value: false,
                      };
                    }
                  ),
                };
              }
              return {
                ...updatedfeaturedVal,
                featureHeaderValue: !featuredVal?.featureHeaderValue,
              };
            }
            return featuredVal;
          }),
        };
      }
      return item;
    });
    setGadgetUserPermissions(updatedUserPermission);
  };

  const updateFeaturedSubValue = (
    changeFeaturedIndex,
    changeFeaturedSubIndex
  ) => {
    const updatedUserPermission = gadgetUserPermissions?.map((item) => {
      if (item?.role === activeUser) {
        return {
          ...item,
          gadgetFeature: item?.gadgetFeature?.map((featuredVal, index) => {
            if (changeFeaturedIndex === index) {
              const featuredValueHeader = featuredVal?.featureSubHeader?.find(
                (featuredSubVal, subIndex) => {
                  if (changeFeaturedSubIndex === subIndex) {
                    if (!featuredSubVal.value) {
                      return !!featuredSubVal.value;
                    }
                    return;
                  }
                }
              );
              return {
                ...featuredVal,
                featureHeaderValue: !featuredValueHeader || true,
                featureSubHeader: featuredVal?.featureSubHeader?.map(
                  (featuredSubVal, subIndex) => {
                    if (changeFeaturedSubIndex === subIndex) {
                      return {
                        ...featuredSubVal,
                        value: !featuredSubVal.value,
                      };
                    }
                    return featuredSubVal;
                  }
                ),
              };
            }
            return featuredVal;
          }),
        };
      }
      return item;
    });
    setGadgetUserPermissions(updatedUserPermission);
  };

  const updateUserGadgetPermission = async () => {
    if (isEmpty(userPermissionDetails)) {
      return;
    }
    try {
      setUpdateLoading(true);
      const result = await GadgetService.updateGadgetUserPermission({
        permission: gadgetUserPermissions,
        gadgetId,
        tenantDomain: tenant?.tenant?.tenantDomain,
      });
      if (
        result?.statusCode ||
        result?.statusCode === 400 ||
        result?.statusCode === 500
      ) {
        throw new Error(result?.errorMessage || "Something went wrong");
      } else {
        toast.success("User Gadget Permission updated successfully!");
      }
      setUpdateLoading(false);
      setGadgetUserPermissions(result);
    } catch (err) {
      setUpdateLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  const removeRole = async (roles, currentRole) => {
    const userPermissionDetails = gadgetUserPermissions?.filter(
      (item) => item?.role !== currentRole
    );
    const userPermissionDetail = gadgetUserPermissions?.find((item) => {
      return item?.role === currentRole;
    });

    if (userPermissionDetail?._id) {
      try {
        const response = await deletePermissionRoles(userPermissionDetail?._id);
        if (
          response?.status ||
          response?.status === 400 ||
          response?.status === 500
        ) {
          throw new Error(
            response?.data.errorMessage || "Something went wrong"
          );
        }
        setGadgetUserPermissions(userPermissionDetails);
        setSelectedRole(roles);
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    } else {
      setSelectedRole(roles);
      setGadgetUserPermissions(userPermissionDetails);
    }
  };

  const addNewRole = (roles, currentRole) => {
    const userPermissionDetails = gadgetUserPermissions?.find(
      (item) => item?.role === currentRole
    );
    if (!userPermissionDetails) {
      let defaultPermission = {};
      gadgetUserPermissions?.forEach((item) => {
        if (item?.role === "all") {
          defaultPermission = {
            ...item,
            role: currentRole,
            tenantDomain: item?.tenantDomain,
            gadgetId: item?.gadgetId,
            isActive: true,
            isViewable: false,
            gadgetFeature: item?.gadgetFeature?.map((subItem) => {
              return {
                ...subItem,
                featureHeaderValue: false,
                featureSubHeader: subItem?.featureSubHeader?.map(
                  (subSubItem) => {
                    return {
                      ...subSubItem,
                      key: subSubItem?.key,
                      displayKey: subSubItem?.displayKey,
                      value: false,
                    };
                  }
                ),
              };
            }),
          };
        }
      });
      setGadgetUserPermissions([...gadgetUserPermissions, defaultPermission]);
      setSelectedRole(roles);
    }
  };

  if (loading) {
    return (
      <div className="flex mb-5 mt-7 items-center justify-center w-full h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex mb-5 mt-7">
      <InvolvTenantGadgetsPermissionSidebar
        activeUser={activeUser}
        setActiveUser={setActiveUser}
        selectedRole={selectedRole}
        addNewRole={addNewRole}
        removeRole={removeRole}
      />
      <div className="w-full pl-3">
        <div className="w-full p-2 pt-0 bg-white rounded-2xl ">
          <div className="mb-2 flex items-end">
            <div className="w-4/5">
              <div className="text-grayInvolv-900 text-base mb-2">
                Manage access
              </div>
              <div className="text-grayInvolv-600 text-xs">
                This section will allow you to define various settings for
                diffrent roles. Users would be able to perform the actions that
                are enabled.
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-3 pr-5">
            <div className="mr-3 text-sm 2xl:text-base">Visible</div>
            {!isEmpty(userPermissionDetails) && (
              <InvolvSwitchButton
                visible={true}
                enabled={userPermissionDetails?.isViewable}
                setEnabled={updateIsViewbale}
              />
            )}
          </div>
          {userPermissionDetails?.gadgetFeature?.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <div>
                    <Disclosure.Button
                      className={
                        "flex justify-between w-full px-4 py-4 text-sm font-medium text-left text-grayInvolv-900 bg-white border rounded rounded-b-none"
                      }
                    >
                      <span className="flex items-center">
                        {item?.featureHeaderDisplayName ||
                          item?.featureHeaderName}{" "}
                        <InformationCircleIcon
                          data-tip
                          data-for={`${item?.featureHeaderName}`}
                          className="h-4 w-4 ml-2 text-blue-800"
                        />
                        {item?.featureHeaderInfo && (
                          <ReactTooltip
                            id={`${item?.featureHeaderName}`}
                            place="right"
                            effect="solid"
                          >
                            {item?.featureHeaderInfo}
                          </ReactTooltip>
                        )}
                      </span>
                      <div className="flex">
                        <div onClick={(e) => e.stopPropagation()}>
                          <InvolvSwitchButton
                            enabled={item?.featureHeaderValue}
                            setEnabled={() => updateFeaturedValue(index)}
                            disabled={userPermissionDetails?.isViewable}
                          />
                        </div>
                        {item?.featureSubHeader.length > 0 && (
                          <ChevronUpIcon
                            className={`${
                              open ? "" : "transform rotate-180"
                            } w-5 h-5 text-grayInvolv-900`}
                          />
                        )}
                      </div>
                    </Disclosure.Button>
                  </div>
                  {item?.featureSubHeader.length > 0 && (
                    <Disclosure.Panel className="px-4 pt-4 pb-4 text-sm text-gray-900 border rounded rounded-t-none border-t-0 bg-gray-100">
                      {item?.featureSubHeader?.map((subItem, subIndex) => (
                        <div
                          className="flex justify-between mb-3 pr-5"
                          key={index + subIndex}
                        >
                          <div className="flex">
                            {subItem?.displayKey || subItem?.key}
                            <InformationCircleIcon
                              data-tip
                              data-for={`${subItem?.key}`}
                              className="h-4 w-4 ml-2 text-blue-800"
                            />
                            {subItem?.infoKey && (
                              <ReactTooltip
                                id={`${subItem?.key}`}
                                place="right"
                                effect="solid"
                              >
                                {subItem?.infoKey}
                              </ReactTooltip>
                            )}
                          </div>
                          <InvolvSwitchButton
                            enabled={subItem?.value}
                            setEnabled={() =>
                              updateFeaturedSubValue(index, subIndex)
                            }
                            disabled={userPermissionDetails?.isViewable}
                          />
                        </div>
                      ))}
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
        {!isEmpty(userPermissionDetails) && (
          <div className="flex mt-5 justify-end mb-20 pb-11">
            {/* {gadgetDetails?.state === "pending" && (
              <InvolvButton
                type="button"
                loading={updateLoading}
                onClick={publishGadget}
              >
                Publish
              </InvolvButton>
            )} */}
            <InvolvButton
              type="submit"
              loading={updateLoading}
              disabled={updateLoading}
              onClick={updateUserGadgetPermission}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Save & Publish
            </InvolvButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvolvTenantGadgetsPermission;
