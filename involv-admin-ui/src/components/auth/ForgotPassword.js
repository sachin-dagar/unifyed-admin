import { ArrowLeftIcon } from "@heroicons/react/solid";
import { ErrorMessage, useFormik } from "formik";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "../../Layout/AuthLayout";
import { apiProvider } from "../../services/api/utilities/provider";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import InvolvButton from "../shared/InvolvButton";
import LayoutTransition from "../shared/LayoutTransition";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const carouselData = [
    {
      name: "Step 1",
      image: "/images/signup-image-1.png",
      href: "#",
      status: "current",
      mainText: "30 Days FREE Trial!",
      subText: "No credit card required",
    },
    {
      name: "Step 2",
      image: "/images/signin-image-1.png",
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
      image: "/images/signup-image-4.png",
      href: "#",
      status: "current",
      mainText: "Always remain up to date",
      subText:
        "Easy way of checking out all your classes or exam schedule on your tips forever",
    },
  ];
  const formik = useFormik({
    initialValues: {
      email: "",
      captchaToken: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is requried"),
      captchaToken: Yup.string().required("Captcha is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await apiProvider.post(
          "api/user/forgotpassword",
          values
        );
        if (response && response?.data?.statusCode !== 500) {
          localStorage.setItem(
            "forgotPasswordResponse",
            JSON.stringify(values)
          );
          navigate("/forgot-verification");
        } else {
          throw new Error(
            response?.data?.errorMessage || "Something went wrong"
          );
        }
      } catch (error) {
        recaptchaRef.current.reset();
        toast.error(error?.message || "Something went wrong");
      }
    },
  });
  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData}>
        <form onSubmit={formik.handleSubmit} className="p-1">
          <Link
            className="flex items-center text-base gap-2 text-indigo-900 cursor-pointer my-10"
            to="/login"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </Link>
          <div className="text-lg 2xl:text-2xl my-4">Forgot Password</div>
          <div className="flex mt-1">
            <div className="w-full relative">
              <input
                type="email"
                name="email"
                className="h-9 2xl:h-12 block w-full pl-3 text-sm 2xl:text-lg border-gray-300 rounded placeholder-gray-500 focus:border-gray-300"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
              />
              {formik.errors && (
                <div className="text-red-500 text-xs mt-1 ml-1 absolute">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col my-8">
            <div className="flex justify-start relative mb-4">
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
              {formik.errors?.captchaToken && (
                <span className="text-red-500 text-xs absolute -bottom-4">
                  {formik.errors?.captchaToken}
                </span>
              )}
            </div>
            <InvolvButton classes="text-base" onClick={formik.handleSubmit}>
              Send
            </InvolvButton>
          </div>
        </form>
      </AuthLayout>
    </LayoutTransition>
  );
};

export default ForgotPassword;
