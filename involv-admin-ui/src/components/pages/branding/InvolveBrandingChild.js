import React, { Fragment, useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Popover, Transition } from "@headlessui/react";
import { apiProvider } from "../../../services/api/utilities/provider";
import toast from "react-hot-toast";
import InvolvButton from "../../shared/InvolvButton";
import Loader from "../../shared/loader/Loader";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import FloatingLabelInput from "../../shared/branding/FloatingLabelInputs";
import {
  EmailIcon,
  ExportIcon,
  InformationCircle,
  LoginLockIcon,
} from "../../../AppIcons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import InvolvImageCrop, {
  InvolvTenantImageCrop,
} from "../../shared/CropImage/InvolvTenantImageCrop";
import ReactTooltip from "react-tooltip";

import axios from "axios";
import { getCroppedImg } from "../../../util";

const sliderImage = [
  {
    name: "slider1",
    value: "",
  },
  {
    name: "slider2",
    value: "",
  },
  {
    name: "slider3",
    value: "",
  },
  {
    name: "slider4",
    value: "",
  },
];

const InvolveBrandingChild = ({ color, setColor }) => {
  const { tenant } = useAuth();
  const [logoSize, setLogoSize] = useState("0.6");
  const [loading, setLoading] = useState(true);
  const [brandingData, setBrandingData] = useState({});
  const [logoUrlImage, setLogoUrlImage] = useState("");
  const [faviconUrlImage, setFaviconUrlImage] = useState("");
  const [isOpenLogoModal, setIsOpenLogoModal] = useState(false);
  const [slidersArr, setSlidersArr] = useState(sliderImage);
  const [carousal, setCarousal] = useState(sliderImage);
  const logoPopupRef = useRef();
  const sliderPopupRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await apiProvider.getAll("api/tenant/branding");
        if (response?.status === 200 && response?.data === "") {
          setBrandingData(null);
          setSlidersArr(sliderImage);
          setCarousal(sliderImage);
          setColor("#3246D3");
          setLoading(false);
        } else if (response?._id) {
          setBrandingData(response);
          setSlidersArr(response?.carousal || sliderImage);
          setCarousal(response?.carousal || sliderImage);
          setColor(response.themeColour);
          setLoading(false);
        } else {
          setBrandingData(null);
          throw new Error(
            response?.data?.errorMessage ||
              response?.data?.error?.response ||
              "Something went wrong"
          );
        }
        setLoading(false);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
        setLoading(false);
      }
    })();
  }, [tenant?.tenant?.tenantDomain]);

  const closeUploadModal = () => {
    setLogoUrlImage("");
    setIsOpenLogoModal(false);
  };

  const svgToPng = (svgDataurl) =>
    new Promise((resolve, reject) => {
      let canvas;
      let ctx;
      let img;

      img = new Image();
      img.src = svgDataurl;
      img.onload = () => {
        canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          img.width,
          img.height
        );

        img = new Image();
        img.src = canvas.toDataURL("image/png");
        img.onload = () => {
          canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        };
      };
    });

  const formik = useFormik({
    initialValues: {
      pageTitle: brandingData?.pageTitle || "",
      loginPageUrl: brandingData?.redirectUrl || "",
      carousal: carousal,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      pageTitle: Yup.string().required("Page title is required"),
      loginPageUrl: Yup.string()
        .required("Logo redirection URL is required")
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Login page URL must be valid URL!"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      if (values?.logoUrl && values?.logoUrl !== "undefined") {
        formData.append("logoUrl", values?.logoUrl, "filename.jpg");
      }
      if (values?.faviconUrl && values?.faviconUrl !== "undefined") {
        formData.append("faviconUrl", values?.faviconUrl);
      }
      formData.append(
        "pageTitle",
        values?.pageTitle
          .split(" ")
          .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
          .join(" ")
      );

      if (color) formData.append("themeColour", color);
      formData.append("redirectUrl", values?.loginPageUrl);
      formData.append("carousal", JSON.stringify(slidersArr));
      if (brandingData?._id) {
        try {
          const response = await apiProvider.patch(
            `api/tenant/branding/${brandingData._id}`,
            formData
          );
          if (response?._id) {
            toast.success("Branding updated successfully");
            setBrandingData(response);
            setLogoUrlImage("");
            resetForm({ ...values, logoUrl: null });
          } else {
            throw new Error(response?.message || "Something went wrong");
          }
        } catch (error) {
          toast.error(error?.message || "Something went wrong");
        }
      } else {
        try {
          const response = await apiProvider.post(
            "api/tenant/branding",
            formData
          );
          if (response?._id) {
            toast.success("Branding updated successfully");
            setBrandingData(response);
            setLogoUrlImage("");
            resetForm({ ...values, logoUrl: null });
          } else {
            throw new Error(response?.message || "Something went wrong");
          }
        } catch (error) {
          toast.error(error?.message || "Something went wrong");
        }
      }
    },
  });

  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG/SVG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  function beforeUploadFav(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG/SVG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-5 bg-white h-full rounded-lg shadow mt-6">
        <h4 className="font-medium text-grayInvolv-900 text-lg 2xl:text-xl">
          Browser Header
        </h4>
        <div className="flex items-center justify-start mt-6 mb-10 gap-12">
          <div className="flex flex-col relative w-1/4">
            <FloatingLabelInput
              type="text"
              name="pageTitle"
              placeholder="Portal Title"
              value={formik.values.pageTitle}
              onChange={formik.handleChange}
              //className="capitalize"
            />

            {formik?.errors && (
              <div className="text-red-600 text-sm absolute -bottom-5 left-2">
                {formik?.errors?.pageTitle}
              </div>
            )}
          </div>

          <div className="flex flex-col relative w-1/4">
            <div className="flex justify-between  items-center">
              <div className="w-full mr-2">
                <FloatingLabelInput
                  type="text"
                  name="loginPageUrl"
                  value={formik.values.loginPageUrl}
                  placeholder="Logo Redirection URL"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="cursor-pointer" data-tip="" data-for="infoT">
                <InformationCircle />
              </div>
              <ReactTooltip id="infoT">
                {
                  "The destination that users would be redirected to upon clicking the logo."
                }
              </ReactTooltip>
            </div>

            {formik?.errors?.loginPageUrl && (
              <div className="text-red-600 text-sm absolute -bottom-5 left-2">
                {formik?.errors?.loginPageUrl}
              </div>
            )}
          </div>

          <div className="w-1/4">
            <div className="flex items-center">
              <span>Upload favicon</span>
              <div className="flex items-center space-x-3 ml-3">
                <div className="h-12  w-12  rounded flex items-center justify-center border border-gray-300">
                  <img
                    className="h-8 w-8 object-contain"
                    src={
                      faviconUrlImage ||
                      brandingData?.faviconUrl ||
                      "data:image/png;base64,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"
                    }
                    name="uploadFavicon"
                  />
                </div>
                <label
                  htmlFor="inputFavicon"
                  className="h-11 w-12 p-2 ml-3 bg-indigo-900 hover:opacity-70 rounded cursor-pointer"
                >
                  <input
                    type="file"
                    name="faviconUrl"
                    id="inputFavicon"
                    onChange={(e) => {
                      if (beforeUploadFav(e.target.files[0])) {
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.addEventListener("load", () => {
                          setFaviconUrlImage(reader.result);
                        });
                        formik.setFieldValue("faviconUrl", e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  {/* <UploadIcon className="w-full h-full text-white" /> */}
                  <div className="text-white flex justify-center items-center h-full w-full">
                    <ExportIcon width="w-4" height="h-4" />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end"></div>
        </div>
        <div className="w-89 my-4 border-30 h-813 border-branding rounded-xl4 mx-auto relative ">
          <div
            className="flex items-center justify-center absolute z-10   w-full"
            style={{ top: "-1.2rem" }}
          >
            <div className="h-2 w-2 bg-gray-200 rounded-full  " />
          </div>
          <div className="flex flex-col md:flex-row h-full">
            {/* LEFT */}
            <div className="w-2/5 h-full flex flex-col pl-16">
              {/* content */}

              <div className="flex-1 flex items-center justify-center">
                <div>
                  <div className="flex mb-10 items-center">
                    <img
                      className="object-contain max-w-xl mr-8 max-h-20"
                      src={
                        logoUrlImage ||
                        brandingData?.logoUrl ||
                        "/images/logo.png"
                      }
                      alt="Involv"
                    />
                    <div className="">
                      <div
                        onClick={() => setIsOpenLogoModal(!isOpenLogoModal)}
                        className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-indigo-900 bg-opacity-5"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </div>
                      <InvolvTenantImageCrop
                        isOpenUploadModal={isOpenLogoModal}
                        closeUploadModal={closeUploadModal}
                        isModalOpen={isOpenLogoModal}
                        handleSave={(file) => {
                          setIsOpenLogoModal(!isOpenLogoModal);
                          return formik.setFieldValue("logoUrl", file);
                        }}
                        defaultImage={
                          logoUrlImage ||
                          brandingData?.logoUrl ||
                          "/images/logo.png"
                        }
                        setDefaultImage={setLogoUrlImage}
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl 2xl:text-xl3 mt-8 font-medium text-blackInvolv-300">
                      Login to your account
                    </h1>
                    <p className="text-grayInvolv-600 text-xs mt-2">
                      Experience your journey with us
                    </p>

                    <div className="flex flex-col flex-1 gap-5 mt-5">
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* <MailIcon className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400 "></MailIcon> */}
                          <EmailIcon customClass="w-4 2xl:w-4.5 text-gray-400 " />
                          {/* <img src="/images/domain-icon.svg" className="w-5 h-5"/> */}
                        </div>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="h-11 block w-full pl-10 text-xs border-gray-300 rounded border placeholder-gray-500 focus-within:ring-0 focus-within:border-none cursor-default"
                          placeholder="Email"
                          readOnly
                        />
                      </div>

                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* <LockClosedIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400 "></LockClosedIcon> */}
                          <LoginLockIcon customClass="w-4 2xl:w-4.5 text-gray-400 " />
                        </div>
                        <input
                          name="password"
                          id="password"
                          className="h-11 block w-full pl-10 text-xs border-gray-300 rounded border placeholder-gray-500 focus-within:ring-0 focus-within:border-none cursor-default"
                          placeholder="Password"
                          readOnly
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <img
                            src="/images/eye-open.svg"
                            className="w-4 mt-2 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    {/* FORGET PASSWORD  */}
                    <div className="flex justify-end my-3">
                      <div
                        className="underline text-xs"
                        style={{ color: `${color}` }}
                      >
                        Forgot Password
                      </div>
                    </div>
                    <div className="mt-7">
                      <button
                        type="button"
                        style={{ backgroundColor: `${color}` }}
                        className="py-2 px-4 w-full text-center rounded text-white cursor-default"
                      >
                        Login
                      </button>
                    </div>

                    <div className="gap-2 my-7 text-xs font-normal">
                      <span>Don't have an account? </span>
                      <span className="underline" style={{ color: `${color}` }}>
                        Create one now
                      </span>
                    </div>

                    <div className="w-full text-xs2 py-3 text-left text-grayInvolv-600 font-normal">
                      By signing on to this portal, you agree to abide by its{" "}
                      <span
                        className="font-normal underline whitespace-nowrap"
                        style={{ color: `${color}` }}
                      >
                        Terms &amp; Conditions
                      </span>{" "}
                      violations could lead to restriction on portal privileges
                      and/or disciplinary action.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            {/* bg-branding bg-cover bg-no-repeat */}
            <div className="w-3/5   h-full pl-20">
              <div
                className="  h-full relative"
                style={{ backgroundColor: `${color}` }}
              >
                <img
                  src={"/images/bg-top.png"}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "50%",
                  }}
                />
                <img
                  src={"/images/bg-bottom.png"}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: "50%",
                  }}
                />
                {/* Carosoule Images Uploads */}
                <div className="flex  items-end justify-center flex-col pr-4 pl-11 h-full absolute top-0 bottom-0 left-0 right-0 m-auto">
                  <img src={"/images/branding-slider1.png"} />
                  <div className="flex items-start justify-center w-full max-w-1/2">
                    {formik.values?.carousal.filter((slider) => slider?.value)
                      .length > 0 ? (
                      <Carousel
                        transitionTime={300}
                        showStatus={false}
                        className="w-full"
                        showArrows={false}
                        infiniteLoop={true}
                        renderIndicator={(
                          onClickHandler,
                          isSelected,
                          index
                        ) => {
                          return (
                            <span
                              className={`w-3 h-3 inline-block mr-3 last:mr-0 rounded-full align-middle ${
                                isSelected
                                  ? "w-3 h-3 bg-white"
                                  : "border bordor-white-200"
                              } cursor-pointer`}
                              onClick={onClickHandler}
                              onKeyDown={onClickHandler}
                              value={index}
                              key={index}
                              role="button"
                              tabIndex={0}
                            ></span>
                          );
                        }}
                        children={formik.values?.carousal
                          .filter((slider) => slider?.value)
                          .map((slider) => (
                            <div className="w-full text-center pb-10">
                              <p className="overflow-y-auto text-base max-h-36 text-white font-normal break-all leading-7">
                                {slider.value?.slice(0, 60)}
                              </p>
                            </div>
                          ))}
                      />
                    ) : (
                      <div className="text-center pb-10">
                        <p className="overflow-y-auto  text-base text-white font-normal ">
                          Sliders will come here
                        </p>
                      </div>
                    )}

                    <div className="pl-2">
                      <Popover className="  w-full">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              ref={sliderPopupRef}
                              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-white bg-indigo-900 bg-opacity-5"
                            >
                              <PencilIcon className="h-5 w-5 text-white" />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute z-10  w-650 px-4 transform translate-x-8 top-20 right-1/2 sm:px-0 ">
                                <div className="overflow-hidden bg-white rounded-md shadow-4xl ring-1 ring-gray-300 ring-opacity-5 ">
                                  <div className="py-7 pl-7 pr-7 space-y-3">
                                    <h1 className="text-grayInvolv-900 text-lg font-medium mb-6">
                                      Carousel
                                    </h1>
                                    <div className="space-y-6 my-3 h-72">
                                      {slidersArr?.map((slider, idx) => (
                                        <input
                                          key={slider?.name}
                                          type="text"
                                          className="h-50 w-full border pl-3 text-xl2 2xl:text-lg border-gray-200   focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent transition-all duration-200 ease-in-out"
                                          name={slider?.name}
                                          placeholder={slider?.name}
                                          value={slider?.value.slice(0, 60)}
                                          onChange={(e) => {
                                            setSlidersArr(
                                              slidersArr?.map((obj) => {
                                                if (
                                                  obj?.name === slider?.name
                                                ) {
                                                  return {
                                                    ...obj,
                                                    value: e.target.value.slice(
                                                      0,
                                                      60
                                                    ),
                                                  };
                                                }
                                                return { ...obj };
                                              })
                                            );
                                          }}
                                        />
                                      ))}
                                    </div>
                                    <div className="flex justify-end items-center space-x-5">
                                      <button
                                        type="reset"
                                        onClick={() => {
                                          setSlidersArr(carousal);
                                          return sliderPopupRef.current?.click();
                                        }}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCarousal(slidersArr);
                                          formik.setFieldValue(
                                            "carousol",
                                            slidersArr
                                          );
                                          sliderPopupRef?.current?.click();
                                        }}
                                        className="primaryBtn w-20 h-9  font-normal text-sm shadow-lg"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end my-3">
        <InvolvButton
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Save
        </InvolvButton>
      </div>
    </form>
  );
};

export default InvolveBrandingChild;
