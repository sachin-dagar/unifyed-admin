import React, { useEffect, useRef, useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  getallSecurityData,
  patchSecurityData,
} from "../../../services/api/security/SecurityService";
import Loader from "../../shared/loader/Loader";
import FloatingLabelInput from "../../shared/FloatingLabelInput";
import InvolvButton from "../../shared/InvolvButton";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import LayoutTransition from "../../shared/LayoutTransition";

const SecurityLocalform = ({ securityConfigData, onSaveHandler }) => {
  return (
    <Formik
      initialValues={{
        hostName: securityConfigData?.hostName,
        tenantDomain: securityConfigData?.tenantDomain,
      }}
      validationSchema={Yup.object().shape({
        tenantDomain: Yup.string().required(`Tenant Domain is required`),
        hostName: Yup.string()
          .matches(
            /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
            "Must be a valid hostname"
          )
          .required(`Hostname is required`),
      })}
      onSubmit={(values) => {
        onSaveHandler({
          ...values,
          authType: "local",
        });
      }}
      enableReinitialize={true}
    >
      {({ values, handleSubmit, dirty, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mt-7">
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="hostName"
                  values={values}
                  placeholder="Hostname"
                />
                <ErrorMessage
                  component="div"
                  name="hostName"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="tenantDomain"
                  placeholder="Tenant domain"
                  values={values}
                  disabled={true}
                />
                <ErrorMessage
                  component="div"
                  name="tenantDomain"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
            <div />
            <div className="flex justify-end mt-5">
              <InvolvButton
                type="submit"
                // disabled={!dirty}
                // disabled={securityConfigData?.authType === "local"}
              >
                Save
              </InvolvButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

const SecurityOuathform = ({ securityConfigData, onSaveHandler }) => {
  const userInfoUrlRef = useRef(null);
  return (
    <Formik
      initialValues={{ ...securityConfigData }}
      validationSchema={Yup.object().shape({
        tenantDomain: Yup.string().required(`Tenant Domain is required`),
        hostName: Yup.string().required(`Host Name is required`),
        clientId: Yup.string().required(`Client Id is required`),
        clientSecret: Yup.string(),
        authorizationURL: Yup.string()
          .url("Authorization url must be valid Url")
          .required(`Authorization URL is required`)
          .nullable(),
        tokenUrl: Yup.string()
          .url("Token url must be valid Url")
          .required(`Token Url is required`),
        callbackURL: Yup.string()
          .url("Callback url must be valid Url")
          .required(`Callback URL is required`),
        userInfoUrl: Yup.string()
          .url("UserInfo url must be valid Url")
          .required(`User Info Url is required`),
        tokenRevokeUrl: Yup.string()
          .url("Token Revoke url must be valid Url")
          .required(`Token Revoke Url is required`),
        logoutRedirectUrl: Yup.string()
          .url("Logout redirect url must be valid Url")
          .required(`Logout Redirect Url is required`),
        //attributeMapping: Yup.object({
        // multiAttributeSeparator: Yup.string().required(
        //   "Multi Attribute Separator is required"
        // ),
        // linkedin: Yup.string()
        //   .url("LinkedIn Url must be a valid Url")
        //   .required("LinkedIn Url is required"),
        // twitter: Yup.string()
        //   .url("Twitter Url must be a valid Url")
        //   .required("Twitter Url is required"),
        // insta: Yup.string()
        //   .url("Instagram Url must be a valid Url")
        //   .required("Instagram Url is required"),
        // facebook: Yup.string()
        //   .url("Facebook Url must be a valid Url")
        //   .required("Facebool Url is required"),
        // phoneNumber: Yup.string().required("Phone number is required"),
        // secondaryPhoneNumber: Yup.string().required(
        //   "Secondary Phone number is required"
        // ),
        // currentState: Yup.string().required("Current State is required"),
        // email: Yup.string()
        //   .email("Email must be a valid email")
        //   .required("Email is required"),
        // secondaryEmail: Yup.string().required("Secondary email is requierd"),
        // firstName: Yup.string().required("First name is required"),
        // lastName: Yup.string().required("Last name is required"),
        // additonalInfo: Yup.object({
        //   scheduleCredentialsAttr: Yup.string().required(
        //     "Schedule Credentials Attribute"
        //   ),
        //   gradesCredentialsAttrail: Yup.string().required(
        //     "Grades Credentails Attr"
        //   ),
        // }),
        // academicInterest: Yup.object({
        //   delimiter: Yup.string().required("Delimiter is required"),
        //   attribute: Yup.string().required("Attribute is required"),
        // }),
        // roles: Yup.object({
        //   processor: Yup.string().required("Processor is required"),
        //   delimiter: Yup.string().required("Delimiter is required"),
        //   attribute: Yup.string().required("Attribute is required"),
        // }),
        //}),
      })}
      onSubmit={async (values) => {
        onSaveHandler({
          ...values,
          authType: "oauth",
        });
      }}
      enableReinitialize={true}
    >
      {({ errors, handleSubmit, dirty, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-6 mt-7">
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="hostName"
                  placeholder="Hostname"
                />
                {errors?.hostName && (
                  <div className="text-red-500 text-xs">{errors?.hostName}</div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="tenantDomain"
                  placeholder="Tenant domain"
                  disabled={true}
                />
                {errors?.tenantDomain && (
                  <div className="text-red-500 text-xs">
                    {errors?.tenantDomain}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="clientId"
                  placeholder="Client ID"
                />
                {errors?.clientId && (
                  <div className="text-red-500 text-xs">{errors?.clientId}</div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="password"
                  name="clientSecret"
                  placeholder="Client secret"
                  autoComplete={"off"}
                />
                {errors?.clientSecret && (
                  <div className="text-red-500 text-xs">
                    {errors?.clientSecret}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="authorizationURL"
                  placeholder="Authorization URL"
                />
                {errors?.authorizationURL && (
                  <div className="text-red-500 text-xs">
                    {errors?.authorizationURL}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="tokenUrl"
                  placeholder="Token URL"
                />

                {errors?.tokenUrl && (
                  <div className="text-red-500 text-xs">{errors?.tokenUrl}</div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="callbackURL"
                  placeholder="Callback URL"
                />
                {errors?.callbackURL && (
                  <div className="text-red-500 text-xs">
                    {errors?.callbackURL}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <div className={`relative rounded`}>
                  <input
                    ref={userInfoUrlRef}
                    type="text"
                    name="somethingnew"
                    className="h-12 w-full border border-gray-200  focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm p-2"
                    id="infoUrl"
                    onChange={(e) =>
                      setFieldValue("userInfoUrl", e.target.value)
                    }
                    value={values?.userInfoUrl}
                  />
                  <span
                    onClick={() => userInfoUrlRef.current.focus()}
                    className={[
                      "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
                      values?.userInfoUrl
                        ? "text-xs px-2 -top-2 left-2 bg-white"
                        : "text-sm p-2 top-1.5 left-0",
                    ].join(" ")}
                  >
                    User info url
                  </span>
                </div>
                {/* <FloatingLabelInput
                  type="text"
                  name="userInfoUrl"
                  placeholder="User info URL"
                  autoComplete={"off"}
                /> */}
                {errors?.userInfoUrl && (
                  <div className="text-red-500 text-xs">
                    {errors?.userInfoUrl}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="tokenRevokeUrl"
                  placeholder="Token Revoke URL"
                />
                {errors?.tokenRevokeUrl && (
                  <div className="text-red-500 text-xs">
                    {errors?.tokenRevokeUrl}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="logoutRedirectUrl"
                  placeholder="Logout Redirect URL"
                />
                {errors?.logoutRedirectUrl && (
                  <div className="text-red-500 text-xs">
                    {errors?.logoutRedirectUrl}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              {/* <div>
                <Field
                  type="checkbox"
                  name="attributeMapping.tenantDomainInSubject"
                  id="tenantDomainInSubject"
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                />
                <label
                  className="form-check-label inline-block text-gray-800 cursor-pointer"
                  htmlFor="tenantDomainInSubject"
                >
                  Tenant Domain In Subject
                </label>
                {errors?.attributeMapping?.tenantDomainInSubject && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.tenantDomainInSubject}
                  </div>
                )}
              </div> */}
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.tenantDomainInSubject"
                  placeholder="Tenant domain in subject"
                />
                {errors?.attributeMapping?.tenantDomainInSubject && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.tenantDomainInSubject}
                  </div>
                )}
              </div>
            </div>
            <div />
            <div className="flex mt-1">
              <h1>Attribute Mapping</h1>
            </div>
            <div />
            <div />
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.multiAttributeSeparator"
                  placeholder="Multi attribute separator"
                />
                {errors?.attributeMapping?.multiAttributeSeparator && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.multiAttributeSeparator}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.linkedin"
                  placeholder="linkedin"
                />
                {errors?.attributeMapping?.linkedin && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.linkedin}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.twitter"
                  placeholder="Twitter"
                />
                {errors?.attributeMapping?.twitter && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.twitter}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.insta"
                  placeholder="Insta"
                />
                {errors?.attributeMapping?.insta && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.insta}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.facebook"
                  placeholder="Facebook"
                />
                {errors?.attributeMapping?.facebook && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.facebook}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.phoneNumber"
                  placeholder="Phone number"
                />
                {errors?.attributeMapping?.phoneNumber && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.phoneNumber}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.secondaryPhoneNumber"
                  placeholder="Secondary phone number"
                />
                {errors?.attributeMapping?.secondaryPhoneNumber && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.secondaryPhoneNumber}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.currentState"
                  placeholder="Current state"
                />
                {errors?.attributeMapping?.currentState && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.currentState}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.email"
                  placeholder="Email"
                />
                {errors?.attributeMapping?.email && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.email}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.secondaryEmail"
                  placeholder="Secondary email"
                />
                {errors?.attributeMapping?.secondaryEmail && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.secondaryEmail}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.userId"
                  placeholder="User Id"
                />
                {errors?.attributeMapping?.userId && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.userId}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.firstName"
                  placeholder="First name"
                />
                {errors?.attributeMapping?.firstName && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.firstName}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.lastName"
                  placeholder="Last name"
                />
                {errors?.attributeMapping?.lastName && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.lastName}
                  </div>
                )}
              </div>
            </div>
            <div />
            <div />
            {/* <div className="flex mt-1 w-full">
              <h1>Additional Info</h1>
            </div>
            <div />
            <div />
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.additionalInfo.scheduleCredentialsAttr"
                  placeholder="Schedule credentials attr"
                />
                {errors?.attributeMapping?.additionalInfo
                  ?.scheduleCredentialsAttr && (
                  <div className="text-red-500 text-xs">
                    {
                      errors?.attributeMapping?.additionalInfo
                        ?.scheduleCredentialsAttr
                    }
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.additonalInfo.gradesCredentialsAttrail"
                  placeholder="Grades credentials attr"
                />
                {errors?.attributeMapping?.additonalInfo
                  ?.gradesCredentialsAttrail && (
                  <div className="text-red-500 text-xs">
                    {
                      errors?.attributeMapping?.additonalInfo
                        ?.gradesCredentialsAttrail
                    }
                  </div>
                )}
              </div>
            </div>
            <div /> */}
            <div className="flex mt-1">
              <h1>Academic Interest</h1>
            </div>
            <div />
            <div />
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.academicInterest.delimiter"
                  placeholder="Delimiter"
                />
                {errors?.attributeMapping?.academicInterest?.delimiter && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.academicInterest?.delimiter}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.academicInterest.attribute"
                  placeholder="Attribute"
                />
                {errors?.attributeMapping?.academicInterest?.attribute && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.academicInterest?.attribute}
                  </div>
                )}
              </div>
            </div>
            <div />
            <div className="flex mt-1">
              <h1>Roles</h1>
            </div>
            <div />
            <div />
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.roles.processor"
                  placeholder="Processor"
                />
                {errors?.attributeMapping?.roles?.processor && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.roles?.processor}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.roles.delimiter"
                  placeholder="Delimiter"
                />
                {errors?.attributeMapping?.roles?.delimiter && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.roles?.delimiter}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-full">
                <FloatingLabelInput
                  type="text"
                  name="attributeMapping.roles.attribute"
                  placeholder="Attribute"
                />
                {errors?.attributeMapping?.roles?.attribute && (
                  <div className="text-red-500 text-xs">
                    {errors?.attributeMapping?.roles?.attribute}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <InvolvButton
              type="submit"
              //disabled={!dirty}
              //disabled={securityConfigData?.authType === "Oauth"}
            >
              Save
            </InvolvButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

function InvolvTenantSecurity() {
  const [securityConfigType, setSecurityConfigType] = useState("local");
  const [securityConfigData, setSecurityConfigData] = useState({});
  const [loading, setLoading] = useState(true);
  const { tenant } = useAuth();

  useEffect(async () => {
    try {
      const securityData = await getallSecurityData();
      if (securityData?.status === 400 && securityData?.status === 500) {
        throw new Error(
          securityData?.data?.errorMessage || "Something went wrong"
        );
      }
      if (securityData?._id) {
        setSecurityConfigData(securityData);
        setSecurityConfigType(securityData?.authType?.toLowerCase());
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || "Something went wrong!");
    }
  }, [tenant]);

  const onSaveHandler = async (values) => {
    try {
      if (securityConfigData?._id) {
        const result = await patchSecurityData(securityConfigData?._id, values);
        if (result?.status === 400 || result?.status === 500) {
          throw new Error(
            result?.data?.validationErrors[0] ||
              result?.data?.errorMessage ||
              "Something went wrong"
          );
        } else {
          if (result?._id) {
            setSecurityConfigData(result);
          }
          setLoading(true);
          toast.success("Security updated successfully!");
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  return (
    <LayoutTransition>
      <div>
        <div className="w-full flex gap-5 flex-col flex-1">
          <div className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
            <div className="sm:flex sm:justify-between sm:items-baseline mb-5">
              <h3 className="text-base font-medium">
                <span className="text-gray-700">Security</span>
              </h3>
            </div>
            {loading ? (
              <div className="flex justify-center h-screen w-full items-center">
                <Loader />
              </div>
            ) : (
              <>
                <ul
                  className="flex mb-0 list-none mb-4 flex-row border-b"
                  role="tablist"
                >
                  <li className="items-center">
                    <label
                      htmlFor="inline1"
                      className={
                        "whitespace-nowrap flex py-2 px-5  font-medium text-sm flex items-center cursor-pointer " +
                        (securityConfigType === "local"
                          ? "border-indigo-500 text-indigo-600 border-b-2 border-indigo-600 shadow-3xl bg-gray-100"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 text-grayInvolv-600")
                      }
                      onClick={(e) => {
                        setSecurityConfigType("local");
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      <input
                        className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="securityConfig"
                        id="inline1"
                        value="local"
                        checked={securityConfigType === "local"}
                      />
                      <div
                        className={
                          "ml-1 leading-7 text-sm " +
                          (securityConfigType === "local"
                            ? "text-grayInvolv-900"
                            : "text-grayInvolv-600")
                        }
                      >
                        Local
                      </div>
                    </label>
                  </li>
                  <li className="md:w-36 items-center ">
                    <label
                      htmlFor="inline2"
                      className={
                        "whitespace-nowrap flex py-2 px-5  font-medium text-sm flex items-center cursor-pointer " +
                        (securityConfigType === "oauth"
                          ? "border-indigo-500 text-indigo-600 border-b-2 border-indigo-600 shadow-3xl bg-gray-100"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 text-grayInvolv-600")
                      }
                      onClick={(e) => {
                        setSecurityConfigType("oauth");
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      <input
                        className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="securityConfig"
                        id="inline2"
                        value="oauth"
                        checked={securityConfigType === "oauth"}
                      />
                      <div
                        className={
                          "ml-1 leading-7 text-sm " +
                          (securityConfigType === "oauth"
                            ? "text-grayInvolv-900"
                            : "text-grayInvolv-600")
                        }
                      >
                        Oauth
                      </div>
                    </label>
                  </li>
                </ul>
                <div className="tab-content tab-space">
                  {securityConfigType === "local" ? (
                    <SecurityLocalform
                      securityConfigData={securityConfigData}
                      onSaveHandler={onSaveHandler}
                    />
                  ) : (
                    <SecurityOuathform
                      securityConfigData={securityConfigData}
                      onSaveHandler={onSaveHandler}
                    />
                  )}
                </div>
              </>
            )}
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

export default InvolvTenantSecurity;
