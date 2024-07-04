import React, { useRef, useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/outline";
import { apiProvider } from "../../services/api/utilities/provider";
import ReactTooltip from "react-tooltip";
import AuthLayout from "../../Layout/AuthLayout";
import LocationSearch from "./LocationSearch";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import LayoutTransition from "../shared/LayoutTransition";
import { isEmpty } from "lodash";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const carouselData = [
  {
    name: "Step 1",
    image: "/images/signup-image-1.png",
    href: "#",
    status: "current",
    mainText: "A single platform for all your campus needs",
    subText:
      "Get all your students, faculty and alumni all in one place for a great engagement experience",
  },
  {
    name: "Step 2",
    image: "/images/signub-image-1.png",
    href: "#",
    status: "current",
    mainText: "Everywhere you want to be with just one-click",
    subText:
      "Interact via posts, likes, shares, and much more with anyone you want",
  },
  {
    name: "Step 3",
    image: "/images/signup-image-3.png",
    href: "#",
    status: "current",
    mainText: "The Gadgets you love. From a place you can trust.",
    subText:
      "Unite Gadget marketplace has proved to be a safe and trusted place to discover and download Gadgets.",
  },
  {
    name: "Step 4",
    status: "current",
    image: "/images/signup-image-4.png",
    mainText: "Always remain up to date",
    subText:
      "Easy way of checking out all your classes or exam schedule on your tips forever",
  },
];

const InvolvSignUp = () => {
  const [acceptTermsError, setAcceptTermsError] = useState(false);
  const [allErrors, setAllErrors] = useState([]);

  const recaptchaRef = useRef(null);

  const makeDomain = (domainURL) => {
    if (!domainURL) {
      return null;
    }
    const domainURLArr = domainURL.split(".");
    if (domainURLArr.length > 1) {
      const avaialbleDomain = [
        "com",
        "in",
        "co",
        "gov",
        "in",
        "info",
        "us",
        "edu",
        "net",
      ];
      const isExist = avaialbleDomain?.find(
        (item) => item === domainURLArr[domainURLArr?.length - 1]
      );

      if (isExist) {
        domainURLArr.pop();
      }
    }

    return domainURLArr.join(".");
  };

  function getDomainName() {
    const currentUrl = window.location.hostname;
    const urlArr = currentUrl.split(".");
    const domainExtension = urlArr
      .splice(urlArr.indexOf("unite"), urlArr.length - 1)
      .join(".");
    return domainExtension;
  }

  const navigate = useNavigate();
  const signupresponse = JSON.parse(localStorage.getItem("signUpresponse"));
  const [searchParams] = useSearchParams();
  const isChangeEmail = searchParams.get("changeEmail");

  const formik = useFormik({
    initialValues: {
      organizationName: (isChangeEmail && signupresponse?.tenantDomain) || "",
      country: (isChangeEmail && signupresponse?.country) || "",
      channelPartner: (isChangeEmail && signupresponse?.channelPartner) || "",
      state: (isChangeEmail && signupresponse?.state) || "",
      zipCode: (isChangeEmail && signupresponse?.zipCode) || 0,
      fullName: (isChangeEmail && signupresponse?.fullName) || "",
      jobTitle: (isChangeEmail && signupresponse?.jobTitle) || "",
      phoneNumber: (isChangeEmail && signupresponse?.phoneNumber) || "",
      email: (isChangeEmail && signupresponse?.email) || "",
      tenantDomain: (isChangeEmail && signupresponse?.tenantDomain) || "",
      termAndConditionEnable: false,
      captchaToken: "",
      emailMarketingEnable: false,
    },

    validationSchema: yup.object({
      organizationName: yup.string().required("Organization Name is required"),
      country: yup.string().required("Location is required"),
      fullName: yup.string().required("Full Name is required"),
      jobTitle: yup.string().required("Job Title is required"),
      captchaToken: yup.string().required("Captcha is required"),
      phoneNumber: yup
        .string()
        .max(16, "Phone Number can not be more than 16 numbers")
        .min(8, "Phone Number must contain at least 8 digits")
        .required("Phone Number is required"),
      email: yup
        .string()
        .email("Work email must be a valid email")
        .required("Work email is required"),
      tenantDomain: yup
        .string()
        .matches(
          /^(?!.*d_)(?!.*_d)[a-zA-Z0-9._-]+$/,
          "Please enter a valid domain name"
        )
        .required("Tenant Domain is required"),
    }),

    onSubmit: async (values) => {
      if (values["termAndConditionEnable"]) {
        try {
          const response = await apiProvider.post("api/tenant/signup", values);
          if (
            response?.status === 412 ||
            response?.status === 400 ||
            response?.data?.errorMessage
          ) {
            throw new Error(
              response?.data?.errorMessage || "Something went wrong"
            );
          }
          localStorage.setItem("signUpresponse", JSON.stringify(response));
          recaptchaRef.current.reset();
          navigate("/email-verification");
        } catch (error) {
          toast.error(error?.message || "Something went wrong");
          recaptchaRef.current.reset();
          setAllErrors([error.message]);
        }
      } else {
        setAcceptTermsError(true);
        recaptchaRef.current.reset();
      }
    },
  });

  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData}>
        <div className="p-1">
          <div className="mt-8">
            {allErrors.length > 0 && (
              <div className="rounded-md bg-red-50 p-2 2xl:p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs 2xl:text-sm font-medium text-red-800">
                      There were {allErrors.length} errors with your submission
                    </h3>
                    <div className="mt-2 text-xs 2xl:text-sm text-red-700">
                      <ul
                        role="list"
                        className="list-style-none pl-5 space-y-1"
                      >
                        {allErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col flex-1 mb-8 relative">
                  <div className="flex items-center w-full border h-12 px-2 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 border-gray-300 rounded placeholder-gray-500">
                    <img
                      src="/images/organization-icon.svg"
                      className="w-5 h-5 pl-1"
                    />
                    <input
                      className="w-full outline-0 focus:outline-none border-0 text-lg pl-3 focus:border-0 border-transparent focus:border-transparent focus:ring-0 px-2"
                      value={formik?.values?.organizationName}
                      id="organizationName"
                      name="organizationName"
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Organization Name"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik?.errors?.organizationName &&
                    formik.touched.organizationName && (
                      <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                        {formik?.errors?.organizationName}
                      </span>
                    )}
                </div>

                <div className="flex flex-col flex-1 mb-8 relative">
                  <LocationSearch
                    address={formik?.values?.country}
                    name="country"
                    onBlur={formik.handleBlur}
                    handleChange={(value) =>
                      formik.setFieldValue("country", value)
                    }
                    icon={true}
                    customClass={
                      "text-lg pl-10 border-gray-300 rounded placeholder-gray-500"
                    }
                    floatingLabel={false}
                  />
                  {formik?.errors?.country && formik.touched.country && (
                    <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                      {formik?.errors?.country}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 mb-8 relative">
                  <div className="flex items-center w-full border h-12 px-2 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 border-gray-300 rounded placeholder-gray-500">
                    <img
                      src="/images/full-name-icon.svg"
                      className="w-5 h-5 pl-1"
                    />
                    <input
                      className="w-full outline-0 focus:outline-none border-0 text-lg pl-3 focus:border-0 border-transparent focus:border-transparent focus:ring-0 px-2"
                      value={formik?.values?.fullName}
                      id="fullName"
                      onBlur={formik.handleBlur}
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik?.errors?.fullName && formik.touched.fullName && (
                    <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                      {formik?.errors?.fullName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 mb-8 relative">
                  <div className="flex items-center w-full border h-12 px-2 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 border-gray-300 rounded placeholder-gray-500">
                    <img
                      src="/images/job-title-icon.svg"
                      className="w-5 h-5 pl-1"
                    />
                    <input
                      className="w-full outline-0 focus:outline-none border-0 text-lg pl-3 focus:border-0 border-transparent focus:border-transparent focus:ring-0 px-2"
                      value={formik?.values?.jobTitle}
                      id="jobTitle"
                      name="jobTitle"
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Job Title"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik?.errors?.jobTitle && formik.touched.jobTitle && (
                    <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                      {formik?.errors?.jobTitle}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 mb-8 relative">
                  <PhoneInput
                    country={"us"}
                    value={formik.values?.phoneNumber}
                    countryCodeEditable={false}
                    dropdownClass="h-40 w-80 rounded "
                    buttonClass="focus:ring-indigo-500 focus:border-indigo-500 w-11 bg-white border-0 top-1 bottom-1 left-1"
                    placeholder="Mobile Number"
                    onBlur={formik.handleBlur}
                    inputClass="py-2 h-12 text-lg focus:ring-indigo-500 focus:border-indigo-500 w-full pl-12 border-gray-300 rounded placeholder-gray-500"
                    masks={{ fr: "(...) ..-..-..", at: "(....) ...-...." }}
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                  />
                  {formik?.errors?.phoneNumber &&
                    formik.touched.phoneNumber && (
                      <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                        {formik?.errors?.phoneNumber}
                      </span>
                    )}
                </div>

                <div className="flex flex-col flex-1 mb-8 relative">
                  <div className="flex items-center w-full border h-12 px-2 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 border-gray-300 rounded placeholder-gray-500">
                    <img
                      src="/images/work-email-icon.svg"
                      className="w-5 h-5 pl-1"
                    />
                    <input
                      className="w-full outline-0 focus:outline-none border-0 text-lg pl-3 focus:border-0 border-transparent focus:border-transparent focus:ring-0 px-2"
                      value={formik?.values?.email}
                      id="workEmail"
                      onBlur={formik.handleBlur}
                      name="email"
                      type="text"
                      placeholder="Work Email"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik?.errors?.email && formik.touched.email && (
                    <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                      {formik?.errors?.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 mb-8 relative">
                  <div className="flex items-center w-full border h-12 px-2 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 border-gray-300 rounded placeholder-gray-500">
                    <img
                      src="/images/domain-icon.svg"
                      className="w-5 h-5 pl-1"
                    />
                    <input
                      className="w-full outline-0 focus:outline-none border-0 text-lg pl-3 focus:border-0 border-transparent focus:border-transparent focus:ring-0 px-2"
                      value={formik?.values?.tenantDomain}
                      placeholder="Tenant Domain"
                      onBlur={formik.handleBlur}
                      id="tenantDomain"
                      name="tenantDomain"
                      type="text"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik?.errors?.tenantDomain &&
                    formik.touched.tenantDomain && (
                      <span className="text-red-500 text-xs absolute -bottom-5 left-2">
                        {formik?.errors?.tenantDomain}
                      </span>
                    )}
                  {formik.values.tenantDomain && (
                    <p className="mt-2 text-sm text-gray-500">
                      <ReactTooltip id="domaintip" place="top" effect="solid">
                        Your domain will be like this
                      </ReactTooltip>
                      {/** ICON */}
                      <span className="flex">
                        <img className="w-4 mr-2" src="/images/i-icon.svg" />
                        https://
                        {makeDomain(formik.values.tenantDomain)
                          .toLowerCase()
                          .replaceAll(".", "-") +
                          `${getDomainName() || ".unite.unifyed.com"}`}
                      </span>
                    </p>
                  )}
                </div>
                {acceptTermsError && (
                  <div className="rounded-md bg-yellow-50 p-2 mb-2">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ExclamationIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                          data-tip="tooltip"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Please accept the terms of service.
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col flex-1 mb-5">
                  <div className="flex items-center">
                    <input
                      id="termAndConditionEnable"
                      name="termAndConditionEnable"
                      type="checkbox"
                      checked={formik?.values?.termAndConditionEnable}
                      className=" h-4 w-4 2xl:h-5 2xl:w-5 text-indigo-900 focus:ring-indigo-900 border-gray-300 rounded"
                      onChange={(e) => {
                        setAcceptTermsError(false);
                        formik.setFieldValue(
                          "termAndConditionEnable",
                          !formik?.values?.termAndConditionEnable
                        );
                      }}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-xs 2xl:text-sm "
                    >
                      I agree to the{" "}
                      <a
                        className="text-indigo-900 font-normal underline"
                        href="https://www.unifyed.com/terms-of-use"
                        target="_blank"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-indigo-900 font-normal underline"
                        href="https://www.unifyed.com/online-and-product-privacy-guide"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  <div className="flex items-center mt-3">
                    <input
                      id="emailMarketingEnable"
                      name="emailMarketingEnable"
                      type="checkbox"
                      checked={formik?.values?.emailMarketingEnable}
                      className=" h-4 w-4 2xl:h-5 2xl:w-5 text-indigo-900 focus:ring-indigo-900 border-gray-300 rounded"
                      onChange={(e) => {
                        setAcceptTermsError(false);
                        formik.setFieldValue(
                          "emailMarketingEnable",
                          !formik?.values?.emailMarketingEnable
                        );
                      }}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-xs 2xl:text-sm "
                    >
                      I agree to receive marketing newsletters on my email.
                    </label>
                  </div>
                  <div className="flex flex-col flex-1 mt-4 mb-2 relative">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.ADMIN_APP_CAPTCHA_SITE_KEY}
                      onChange={(token) =>
                        formik.setFieldValue(
                          "captchaToken",
                          token === null ? "" : token
                        )
                      }
                    />
                    {formik?.errors?.captchaToken &&
                      formik.touched.captchaToken && (
                        <span className="text-red-500 text-xs absolute -bottom-4 left-2">
                          {formik?.errors?.captchaToken}
                        </span>
                      )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="primaryBtn w-full h-10 2xl:h-12 text-base 2xl:text-lg"
                  >
                    Start Free Trial
                  </button>
                  <div className="my-3 text-xs 2xl:text-sm">
                    Already have an account?
                    <NavLink
                      to="/login"
                      className="ml-2 text-indigo-900 font-normal underline"
                    >
                      Login here
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AuthLayout>
    </LayoutTransition>
  );
};

export default InvolvSignUp;
