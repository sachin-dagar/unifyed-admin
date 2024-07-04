import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CustomTabs from "../../../shared/CustomTabs";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  getDirectoryData,
  postByIdDirectoryData,
  postDirectoryData,
  postTestConnectivity,
} from "../../../../services/api/directory/DirectoryService";
import FloatingLabelInput from "../../../shared/FloatingLabelInput";
import { useNavigate, useParams } from "react-router";
import InvolvButton from "../../../shared/InvolvButton";
import LayoutTransition from "../../../shared/LayoutTransition";
import { handleError } from "../../../../services/api/utilities/response";
import { useAuth } from "../../../../services/api/context/authContext/AuthContext";
import { isSet } from "lodash";

const ADDirectoryConfig = ({
  onSaveHandler,
  testClicked,
  setTestClicked,
  onTestConnection,
  isTestLoading,
  directoryConfigData,
  isLoading,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        connectionName: directoryConfigData?.connectionName,
        userName: directoryConfigData?.userName,
        password: directoryConfigData?.password,
        connectionUrl: directoryConfigData?.connectionUrl,
        userSearchBase:
          directoryConfigData?.userSearchBase || "DC=qldevad,DC=local",
        userSearchFilter:
          directoryConfigData?.userSearchFilter ||
          "(&(objectClass=organizationalPerson)(sAMAccountName=?))",
        userListFilter:
          directoryConfigData?.userListFilter ||
          "(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person)))",
        userNameAttribute:
          directoryConfigData?.userNameAttribute || "sAMAccountName",
        enabled: directoryConfigData?.enabled,
        referalEnabled: directoryConfigData?.referalEnabled,
        groupSearchBase: directoryConfigData?.groupSearchBase,
        groupSearchFilter:
          directoryConfigData?.groupSearchFilter ||
          "(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person))(cn=?))",
        groupListFilter:
          directoryConfigData?.groupListFilter ||
          "(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person)))",
        groupNameAttribute: directoryConfigData?.groupNameAttribute || "cn",
        membershipAttribute:
          directoryConfigData?.membershipAttribute || "member",
        memberOfAttribute: directoryConfigData?.memberOfAttribute || "memberOf",
      }}
      validationSchema={Yup.object().shape({
        connectionName: Yup.string().required(`Connection name is required`),
        userName: Yup.string().required(`Bind account username is required`),
        password: Yup.string().required(`Bind account password is required`),
        connectionUrl: Yup.string().required(`Connection URL is required`),
        //   userSearchBase: Yup.string().required(`User sarch base is required`),
        //   userSearchFilter: Yup.string().required(
        //     `User search filter is required`
        //   ),
        //   userListFilter: Yup.string().required(`User list filter is required`),
        //   userNameAttribute: Yup.string().required(
        //     `UserID attribute is required`
        //   ),
        //  // groupSearchBase: Yup.string().required(`Group Search Base is required`),
        //   groupSearchFilter: Yup.string().required(
        //     `Group Search Filter is required`
        //   ),
        //   groupListFilter: Yup.string().required(`Group List Filter is required`),
        //   groupNameAttribute: Yup.string().required(
        //     `Group Name Attribute is required`
        //   ),
        //   membershipAttribute: Yup.string().required(
        //     `Membership Attribute Filter is required`
        //   ),
        //   memberOfAttribute: Yup.string().required(
        //     `Member Of Attribute is required`
        //   ),
        //   referalEnabled: Yup.string().required(`Referral is required`),
      })}
      onSubmit={(values) => {
        if (testClicked) {
          onTestConnection({
            ...values,
            isActiveDirectory: true,
          });
        } else {
          onSaveHandler({
            ...values,
            isActiveDirectory: true,
          });
        }
      }}
    >
      {({ values, handleSubmit, errors, dirty }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-6 mt-2 mt-1">
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="connectionName"
                  type="text"
                  name="connectionName"
                  placeholder="Connection name"
                />
                <ErrorMessage
                  component="div"
                  name="connectionName"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userName"
                  type="text"
                  name="userName"
                  placeholder="Bind account username"
                />
                <ErrorMessage
                  component="div"
                  name="userName"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Bind account password"
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="connectionUrl"
                  type="text"
                  name="connectionUrl"
                  placeholder="Connection URL"
                />
                <ErrorMessage
                  component="div"
                  name="connectionUrl"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userSearchBase"
                  type="text"
                  name="userSearchBase"
                  placeholder="User Search Base"
                />
                <ErrorMessage
                  component="div"
                  name="userSearchBase"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupSearchBase"
                  type="text"
                  name="groupSearchBase"
                  placeholder="User entry object class"
                />
                <ErrorMessage
                  component="div"
                  name="groupSearchBase"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userSearchFilter"
                  type="text"
                  name="userSearchFilter"
                  placeholder="User search filter"
                />
                <ErrorMessage
                  component="div"
                  name="userSearchFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userListFilter"
                  type="text"
                  name="userListFilter"
                  placeholder="User list filter"
                />
                <ErrorMessage
                  component="div"
                  name="userListFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userNameAttribute"
                  type="text"
                  name="userNameAttribute"
                  placeholder="UserID attribute"
                />
                <ErrorMessage
                  component="div"
                  name="userNameAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupListFilter"
                  type="text"
                  name="groupListFilter"
                  placeholder="Group List Filter"
                />
                <ErrorMessage
                  component="div"
                  name="groupListFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupSearchFilter"
                  type="text"
                  name="groupSearchFilter"
                  placeholder="Group Search Filter"
                />
                <ErrorMessage
                  component="div"
                  name="groupSearchFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupNameAttribute"
                  type="text"
                  name="groupNameAttribute"
                  placeholder="Group Name Attribute"
                />
                <ErrorMessage
                  component="div"
                  name="groupNameAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="membershipAttribute"
                  type="text"
                  name="membershipAttribute"
                  placeholder="Membership Attribute"
                />
                <ErrorMessage
                  component="div"
                  name="membershipAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="memberOfAttribute"
                  type="text"
                  name="memberOfAttribute"
                  placeholder="Member Of Attribute"
                />
                <ErrorMessage
                  component="div"
                  name="memberOfAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div />
            <div className="flex mt-3">
              <div className="w-full">
                <Field
                  id="referalEnabled"
                  type="checkbox"
                  name="referalEnabled"
                  className={`form-check-input form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${
                    values?.referalEnabled ? "bg-indigo-900" : "bg-white"
                  }`}
                />
                <label
                  className="form-check-label inline-block text-gray-800 cursor-pointer"
                  htmlFor="referalEnabled"
                >
                  Referal Enabled
                </label>
                <ErrorMessage
                  component="div"
                  name="referalEnabled"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-3">
              <div className="w-full">
                <Field
                  id="enabled"
                  type="checkbox"
                  name="enabled"
                  className={`form-check-input form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${
                    values?.enabled ? "bg-indigo-900" : "bg-white"
                  }`}
                />
                <label
                  className="form-check-label inline-block text-gray-800 cursor-pointer"
                  htmlFor="enabled"
                >
                  Enable Directory
                </label>
                <ErrorMessage
                  component="div"
                  name="enabled"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <InvolvButton
              type="submit"
              loading={isLoading}
              disabled={isLoading || !dirty}
              classes="mr-5"
            >
              Save
            </InvolvButton>
            <InvolvButton
              type="submit"
              loading={isTestLoading}
              disabled={isTestLoading || !dirty}
              onClick={() => setTestClicked(true)}
            >
              Test Connectivity
            </InvolvButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

const LDAPDirectoryConfig = ({
  onSaveHandler,
  directoryConfigData,
  testClicked,
  setTestClicked,
  onTestConnection,
  isTestLoading,
  isLoading,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        connectionName: directoryConfigData?.connectionName,
        userName: directoryConfigData?.userName,
        password: directoryConfigData?.password,
        connectionUrl: directoryConfigData?.connectionUrl,
        userSearchBase:
          directoryConfigData?.userSearchBase || "DC=qldevad,DC=local",
        userSearchFilter:
          directoryConfigData?.userSearchFilter ||
          "(&(objectClass=organizationalPerson)(sAMAccountName=?))",
        userListFilter:
          directoryConfigData?.userListFilter ||
          "(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person)))",
        userNameAttribute:
          directoryConfigData?.userNameAttribute || "sAMAccountName",
        enabled: directoryConfigData?.enabled || false,
        referalEnabled: directoryConfigData?.referalEnabled || false,
        groupSearchBase: directoryConfigData?.groupSearchBase,
        groupSearchFilter:
          directoryConfigData?.groupSearchFilter ||
          "(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person))(cn=?))",
        groupListFilter:
          directoryConfigData?.groupListFilter ||
          "(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person)))",
        groupNameAttribute: directoryConfigData?.groupNameAttribute || "cn",
        membershipAttribute:
          directoryConfigData?.membershipAttribute || "member",
        memberOfAttribute: directoryConfigData?.memberOfAttribute || "memberOf",
      }}
      validationSchema={Yup.object().shape({
        connectionName: Yup.string().required(`Connection name is required`),
        userName: Yup.string().required(`Bind account username is required`),
        password: Yup.string().required(`Bind account password is required`),
        connectionUrl: Yup.string().required(`Connection URL is required`),
        // userSearchBase: Yup.string().required(`User sarch base is required`),
        // userSearchFilter: Yup.string().required(
        //   `User search filter is required`
        // ),
        // userListFilter: Yup.string().required(`User list filter is required`),
        // userNameAttribute: Yup.string().required(
        //   `UserID attribute is required`
        // ),
        // //groupSearchBase: Yup.string().required(`Group Search Base is required`),
        // groupSearchFilter: Yup.string().required(
        //   `Group Search Filter is required`
        // ),
        // groupListFilter: Yup.string().required(`Group List Filter is required`),
        // groupNameAttribute: Yup.string().required(
        //   `Group Name Attribute is required`
        // ),
        // membershipAttribute: Yup.string().required(
        //   `Membership Attribute Filter is required`
        // ),
        // memberOfAttribute: Yup.string().required(
        //   `Member Of Attribute is required`
        // ),
        // referalEnabled: Yup.string().required(`Referral is required`),
      })}
      onSubmit={(values) => {
        if (testClicked) {
          onTestConnection({
            ...values,
            isActiveDirectory: false,
          });
        } else {
          onSaveHandler({
            ...values,
            isActiveDirectory: false,
          });
        }
      }}
    >
      {({ values, handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-6 mt-1">
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="connectionNameLDAP"
                  type="text"
                  name="connectionName"
                  placeholder="Connection name"
                />
                <ErrorMessage
                  component="div"
                  name="connectionName"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userNameLDAP"
                  type="text"
                  name="userName"
                  placeholder="Bind account username"
                />
                <ErrorMessage
                  component="div"
                  name="userName"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="passwordLDAP"
                  type="password"
                  name="password"
                  placeholder="Bind account password"
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="connectionUrlLDAP"
                  type="text"
                  name="connectionUrl"
                  placeholder="Connection URL"
                />
                <ErrorMessage
                  component="div"
                  name="connectionUrl"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userSearchBaseLDAP"
                  type="text"
                  name="userSearchBase"
                  placeholder="User Search Base"
                />
                <ErrorMessage
                  component="div"
                  name="userSearchBase"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupSearchBaseLDAP"
                  type="text"
                  name="groupSearchBase"
                  placeholder="User entry object class"
                />
                <ErrorMessage
                  component="div"
                  name="groupSearchBase"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userSearchFilterLDAP"
                  type="tuserSearchFilterext"
                  name="userSearchFilter"
                  placeholder="User search filter"
                />
                <ErrorMessage
                  component="div"
                  name="userSearchFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userListFilterLDAP"
                  type="text"
                  name="userListFilter"
                  placeholder="User list filter"
                />
                <ErrorMessage
                  component="div"
                  name="userListFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="userNameAttributeLDAP"
                  type="text"
                  name="userNameAttribute"
                  placeholder="UserID attribute"
                />
                <ErrorMessage
                  component="div"
                  name="userNameAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupListFilterLDAP"
                  type="text"
                  name="groupListFilter"
                  placeholder="Group List Filter"
                />
                <ErrorMessage
                  component="div"
                  name="groupListFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupSearchFilterLDAP"
                  type="text"
                  name="groupSearchFilter"
                  placeholder="Group Search Filter"
                />
                <ErrorMessage
                  component="div"
                  name="groupSearchFilter"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="groupNameAttributeLDAP"
                  type="text"
                  name="groupNameAttribute"
                  placeholder="Group Name Attribute"
                />
                <ErrorMessage
                  component="div"
                  name="groupNameAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="membershipAttributeLDAP"
                  type="text"
                  name="membershipAttribute"
                  placeholder="Membership Attribute"
                />
                <ErrorMessage
                  component="div"
                  name="membershipAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-2 mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  id="memberOfAttributeLDAP"
                  type="text"
                  name="memberOfAttribute"
                  placeholder="Member Of Attribute"
                />
                <ErrorMessage
                  component="div"
                  name="memberOfAttribute"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div />
            <div className="flex mt-3">
              <div className="w-full">
                <Field
                  id="referalEnabledLDAP"
                  type="checkbox"
                  name="referalEnabled"
                  className={`form-check-input form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${
                    values?.referalEnabled ? "bg-indigo-900" : "bg-white"
                  }`}
                />
                <label
                  className="form-check-label inline-block text-gray-800 cursor-pointer"
                  htmlFor="referalEnabled"
                >
                  Referal Enabled
                </label>
                <ErrorMessage
                  component="div"
                  name="enabled"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-3">
              <div className="w-full">
                <Field
                  id="enabledLDAP"
                  type="checkbox"
                  name="enabled"
                  className={`form-check-input form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${
                    values?.enabled ? "bg-indigo-900" : "bg-white"
                  }`}
                />
                <label
                  className="form-check-label inline-block text-gray-800 cursor-pointer"
                  htmlFor="enabled"
                >
                  Enable Directory
                </label>
                <ErrorMessage
                  component="div"
                  name="enabled"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <InvolvButton
              type="submit"
              loading={isLoading}
              disabled={isLoading || !dirty}
              classes="mr-5"
            >
              Save
            </InvolvButton>
            <InvolvButton
              type="submit"
              loading={isTestLoading}
              disabled={isTestLoading || !dirty}
              onClick={() => setTestClicked(true)}
            >
              Test Connectivity
            </InvolvButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

function InvolvTenantDirectoryConfig() {
  const [directoryConfigData, setDirectoryConfigData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [testClicked, setTestClicked] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const navigate = useNavigate();

  const { directoryId } = useParams();

  useEffect(async () => {
    if (directoryId) {
      try {
        setLoading(true);
        const directoryData = await getDirectoryData(directoryId);
        if (directoryData?.status === 400) {
          throw new Error(
            directoryData?.data?.errorMessage || "Something went wrong"
          );
        }
        if (directoryData?._id) {
          setDirectoryConfigData(directoryData);
        } else {
          toast.error("Something went wrong!");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message || "Something went wrong!");
      }
    }
  }, []);

  const onTestConnection = async (values) => {
    setTestClicked(false);
    try {
      setIsTestLoading(true);
      const testConnection = await postTestConnectivity({
        ...values,
        _id: directoryId,
      });
      if (testConnection.isSuccess || testConnection.statusCode === 200) {
        toast.success("Connection Successfull");
      } else {
        throw new Error(
          (testConnection?.data?.validationErrors
            ? "Please fill required field"
            : false) ||
            testConnection?.data?.errorMessage ||
            "Could not connect to connection Url" ||
            "Something went wrong"
        );
      }
      setIsTestLoading(false);
    } catch (error) {
      setIsTestLoading(false);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const onSaveHandler = async (values) => {
    if (directoryId) {
      try {
        setLoading(true);
        const directoryData = await postByIdDirectoryData(directoryId, {
          ...values,
          _id: directoryId,
        });
        if (
          directoryData?.statusCode === 400 ||
          directoryData.statusCode === 500
        ) {
          throw new Error(
            directoryData?.data?.errorMessage || "Something went wrong"
          );
        }
        setLoading(false);
        toast.success("Directory config updated!");
      } catch (error) {
        setLoading(false);
        toast.error(error?.message || "Something went wrong!");
      }
    } else {
      try {
        setLoading(true);
        const directoryData = await postDirectoryData({
          ...values,
        });
        if (directoryData?._id) {
          setLoading(false);
          navigate(`${directoryData?._id}`)
          toast.success("Directory config created");
        } else {
          throw new Error(
            directoryData?.data?.errorMessage || "Something went wrong"
          );
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.message || "Something went wrong!");
      }
    }
  };

  return (
    <LayoutTransition>
      <div>
        <div className="w-full flex gap-5 flex-col flex-1">
          <div className="bg-white px-7 py-10 shadow sm:rounded-lg sm:px-7">
            <div className="sm:flex sm:justify-between sm:items-baseline">
              <h3 className="text-base">
                <span className="text-grayInvolv-900 text-xl3">
                  Directory Integration
                </span>
              </h3>
            </div>
            <div className="gap-4 mt-7">
              <span className="text-base text-grayInvolv-900">
                Directory Type
              </span>
              <CustomTabs
                tabArray={[
                  {
                    label: "AD",
                    element: (
                      <ADDirectoryConfig
                        testClicked={testClicked}
                        setTestClicked={setTestClicked}
                        onSaveHandler={onSaveHandler}
                        onTestConnection={onTestConnection}
                        directoryConfigData={
                          directoryConfigData?.isActiveDirectory
                            ? directoryConfigData
                            : {}
                        }
                        isTestLoading={isTestLoading}
                        isLoading={isLoading}
                      />
                    ),
                  },
                  {
                    label: "LDAP",
                    element: (
                      <LDAPDirectoryConfig
                        testClicked={testClicked}
                        setTestClicked={setTestClicked}
                        onSaveHandler={onSaveHandler}
                        onTestConnection={onTestConnection}
                        directoryConfigData={
                          !directoryConfigData?.isActiveDirectory
                            ? directoryConfigData
                            : {}
                        }
                        isTestLoading={isTestLoading}
                        isLoading={isLoading}
                      />
                    ),
                  },
                ]}
                defaultSelect={ directoryId && !directoryConfigData?.isActiveDirectory ? 2 : 1 }
              /> 
            </div>
          </div>
          {/* <div className="flex justify-end">
          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="items-center ml-3 inline-block px-4 py-2 bg-blue-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={onSaveHandler}
          >
            Save
          </button>
        </div> */}
        </div>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantDirectoryConfig;
