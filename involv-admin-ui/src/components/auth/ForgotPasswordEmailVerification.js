import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../../Layout/AuthLayout";
import toast from "react-hot-toast";
import { apiProvider } from "../../services/api/utilities/provider";
import { XCircleIcon } from "@heroicons/react/solid";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Loader from "../shared/loader/Loader";
import OtpInput from "react-otp-input";
import LayoutTransition from "../shared/LayoutTransition";

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
const ForgotPasswordEmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [sec, setsec] = useState(60);
  const [showresend, setshowresend] = useState(false);
  const [isactive, setisactive] = useState(true);
  const [resendMessage, setResendMessage] = useState(false);
  const [invalidcode, setinvalidcode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const verifybtn = useRef();
  const navigate = useNavigate();
  const handleVerifyClick = (token) => {
    localStorage.setItem("forgotValidation", JSON.stringify(token));
    // navigate the user to setUp Password screen after getting the validationCode
    navigate("/reset-password");
  };
  useEffect(() => {
    let interval = null;
    if (isactive) {
      interval = setInterval(() => {
        setsec(sec - 1);
        if (sec == 0) {
          clearInterval(interval);
          setisactive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setshowresend(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isactive, sec]);

  const forgotPasswordResponse = JSON.parse(
    localStorage.getItem("forgotPasswordResponse")
  );
  useEffect(() => {
    // redirect the user to login page if email is not available
    if (!forgotPasswordResponse?.email) navigate("/forgot-password");
    const listener = window.addEventListener("beforeunload", () => {
      localStorage.removeItem("forgotPasswordResponse");
    });
    return () => {
      window.removeEventListener(listener, () => {});
    };
  }, []);

  const handleResendOtp = async () => {
    try {
      const data = { email: forgotPasswordResponse?.email, resendFlag: true };
      const response = await apiProvider.post("api/user/forgotpassword", data);
      if (response && response?.data?.statusCode !== 500) {
        toast.success("Otp sent");
        setsec(60);
        setResendMessage(true);
        setisactive(true);
      } else {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleGoBack = async () => {
    localStorage.removeItem("forgotPasswordResponse");
    localStorage.removeItem("forgotValidation");
    navigate("/forgot-password");
  };

  const validateCode = async () => {
    if (otp.length == 6) {
      setinvalidcode(false);
      try {
        const data = {
          email: forgotPasswordResponse?.email,
          validationCode: parseInt(otp),
        };
        const response = await apiProvider.post(
          "api/user/forgotpassword/validate",
          data
        );

        if (response?.token) {
          handleVerifyClick(response?.token);
          toast.success("Please Set Password");
        } else {
          throw new Error(
            response?.data?.errorMessage || "Something went wrong"
          );
        }
      } catch (error) {
        setinvalidcode(true);
        setOtp("");
        setErrors(["Invalid OTP"]);
        toast.error(error?.message || "Something went wrong");
      }
    } else {
      toast.error("Please enter valid code.");
    }
  };

  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData}>
        <div className="space-y-5">
          <span
            className="flex items-center text-base gap-2 text-indigo-900 cursor-pointer my-10"
            onClick={handleGoBack}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </span>
          <h1 className="text-xl 2xl:text-3xl font-medium text-blackInvolv-300 pb-2 mt-10">
            Email security verification
          </h1>
          <span className="text-sm 2xl:text-base font-light text-grayInvolv-600">
            Please verify your email address (
            <span className="text-indigo-900">
              {forgotPasswordResponse?.email}
            </span>
            ) by entering the security code which is sent to your email address
          </span>
          {invalidcode && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Invalid verification code
                  </h3>
                </div>
              </div>
            </div>
          )}
          {resendMessage && (
            <div className="border border-indigo-900 px-3 py-4 bg-indigo-100 text-indigo-900 rounded flex items-center justify-between">
              The security code has been sent to your registered email address.
              <XCircleIcon
                className="w-6 h-6"
                onClick={() => setResendMessage(false)}
              />
            </div>
          )}
          <OtpInput
            value={otp}
            inputStyle="mb-1 w-12 h-12 focus:shadow-lg border text-indigo-900 border-gray-300 rounded  flex items-center text-center justify-center mt-2"
            onChange={(value) => setOtp(value)}
            numInputs={6}
            isInputNum={true}
            separator={<span className="ml-6"></span>}
          />
          <div className="flex items-center justify-between h-20 ">
            <div className="flex flex-col w-full h-full relative justify-center">
              <p className="text-sm 2xl:text-base font-light  w-full mb-3 text-grayInvolv-900">
                {isactive && (
                  <>
                    You can resend the security code in{" "}
                    <span className="text-sm text-indigo-900 font-semibold transform animate-bounce">
                      {sec}
                    </span>{" "}
                    second(s)
                  </>
                )}
              </p>
              <p
                className={`mb-3  cursor-pointer text-sm 2xl:text-base ${
                  !isactive ? "text-indigo-900" : "text-grayInvolv-600"
                }`}
                onClick={!isactive ? handleResendOtp : undefined}
              >
                Resend Verification code
              </p>
            </div>
          </div>
          <div className="mt-10">
            <button
              ref={verifybtn}
              type="submit"
              onClick={() => {
                validateCode();
              }}
              className="primaryBtn w-full h-12"
            >
              Verify
            </button>
          </div>
        </div>
      </AuthLayout>
    </LayoutTransition>
  );
};
export default ForgotPasswordEmailVerification;
