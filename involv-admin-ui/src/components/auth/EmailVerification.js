import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../../Layout/AuthLayout";
import toast from "react-hot-toast";
import { apiProvider } from "../../services/api/utilities/provider";
import { XCircleIcon } from "@heroicons/react/solid";
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
const EmailVerification = () => {
  const [sec, setsec] = useState(59);
  const [isactive, setisactive] = useState(true);
  const [invalidcode, setinvalidcode] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const verifybtn = useRef();
  const handleVerifyClick = (token) => {
    localStorage.setItem("validationCode", token);
    // navigate the user to setUp Password screen after getting the validationCode
    navigate("/password");
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
    }
    return () => {
      clearInterval(interval);
    };
  }, [isactive, sec]);

  const signupresponse = JSON.parse(localStorage.getItem("signUpresponse"));
  
  useEffect(() => {
    // redirect the user to login page if email is not available
    if (!signupresponse?.email) navigate("/signup");
  }, []);

  const handleResendOtp = async () => {
    try {
      const response = await apiProvider.post("api/tenant/resendvalidateotp", {
        tenantDomain: signupresponse?.tenantDomain,
        email: signupresponse?.email,
        resendFlag: true,
      });
      if (!response?.validationSuccess) {
        throw new Error(response?.data.message || "Something went wrong");
      }
      toast.success("Otp sent to your email");
      setisactive(true);
      setsec(60);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const validateCode = async () => {
    if (otp.length == 6) {
      setinvalidcode(false);
      const data = {
        tenantDomain: signupresponse.tenantDomain,
        email: signupresponse.email,
        validationCode: parseInt(otp),
      };
      try {
        const response = await apiProvider.post("api/tenant/validateotp", data);
        if (response.validationSuccess) {
          handleVerifyClick(otp);
          toast.success("Please Set Password");
        } else {
          setOtp("");
          setinvalidcode(true);
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      toast.error("Please enter valid code.");
    }
  };

  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData}>
        <div className="space-y-5 p-1">
          <h1 className="text-xl 2xl:text-3xl font-medium text-blackInvolv-300 mb-2 mt-10">
            Email security verification
          </h1>
          <span className="text-sm 2xl:text-base font-light text-grayInvolv-600">
            Please verify your email address (
            <span className="text-indigo-900">{signupresponse?.email}</span>) by
            entering the security code which is sent to your email address
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
          <OtpInput
            value={otp}
            inputStyle="mb-4  w-12 h-12 focus:shadow-lg border text-indigo-900 border-gray-300 rounded  flex items-center text-center justify-center mt-3 mb-2"
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
                      00:{sec > 9 ? sec : `0${sec}`}
                    </span>{" "}
                    minute(s)
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

              {/* <p
                className="cursor-pointer text-sm 2xl:text-base text-indigo-900"
                onClick={handleGoBack}
              >
                Change email
              </p> */}
            </div>
          </div>
          <div className="mt-10">
            <button
              ref={verifybtn}
              type="submit"
              onClick={() => {
                validateCode();
              }}
              className="primaryBtn text-xl w-full h-12 mt-7 2xl:mt-10"
            >
              Verify
            </button>
          </div>
        </div>
      </AuthLayout>
    </LayoutTransition>
  );
};
export default EmailVerification;
