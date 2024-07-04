import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { ErrorMessage, useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { NavLink, Link, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "../../Layout/AuthLayout";
import {
  verifyAdminInviteLink,
  addTenantUser,
  verifyTenantUser,
} from "../../services/api/admin/AdminService";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import InvolvButton from "../shared/InvolvButton";
import LayoutTransition from "../shared/LayoutTransition";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/outline";
import { isEmpty } from "lodash";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const InvolvInviteAdmin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const uuid = searchParams.get("vt");
  const [isExist, setIsExist] = useState(false);
  const [showpasswordstrength, setshowpasswordstrength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [strength, setstrength] = useState(0);
  const [passworderror, setpassworderror] = useState([]);
  const [passwordrules, setpasswordrules] = useState([
    {
      title: "8 or more characters",
      pass: false,
      func: (val) => {
        return val.length >= 8 ? true : false;
      },
    },
    {
      title: "At least one numeric number",
      pass: false,
      func: (val) => {
        const regex = /\d/;
        return regex.test(val);
      },
    },
    {
      title: "At least one lower case character",
      pass: false,
      func: (val) => {
        return /[a-z]/.test(val);
      },
    },
    {
      title: "At least one upper case character",
      pass: false,
      func: (val) => {
        return /[A-Z]/.test(val);
      },
    },
    {
      title: "At least one special character",
      pass: false,
      func: (val) => {
        const sps = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return sps.test(val);
      },
    },
  ]);
  const [passwordupdated, setpasswordupdated] = useState(false);

  const handlePasswordChange = (evt) => {
    setpassword(evt.target.value);
    let prules = passwordrules;
    setstrength(0);
    let curstr = 0;
    prules.map((prule) => {
      prule.pass = false;
      prule.pass = prule.func(evt.target.value);
      if (prule.pass == true) {
        curstr += 20;
      }
    });
    setstrength(curstr);
    setpasswordrules([...prules]);
  };

  const handleClassStrength = (stren) => {
    if (stren === 20) {
      return "w-1/5 bg-red-400 h-1 rounded-md shadow-xlg transition duration-300";
    }
    if (stren === 40) {
      return "w-2/5 bg-yellow-600 h-1 rounded-md shadow-xlg transition duration-300";
    }
    if (stren === 60) {
      return "w-3/5 bg-yellow-400 h-1 rounded-md shadow-xlg transition duration-300";
    }
    if (stren === 80) {
      return "w-4/5 bg-yellow-200 h-1 rounded-md shadow-xlg transition duration-300";
    }
    if (stren === 100) {
      return "w-full bg-green-400 h-1 rounded-md shadow-xlg transition duration-300";
    }
    return "w-0 bg-red-400 h-1 rounded-md shadow-xlg transition duration-300";
  };

  const submitPasswords = async () => {
    if (!isEmpty(password) && !isEmpty(cpassword) && strength === 100) {
      if (password !== cpassword) {
        setpassworderror(["Passwords must match"]);
      } else {
        setpassworderror([]);
        try {
          const payload = {
            password: password,
            confirmPassword: cpassword,
          };

          const response = await addTenantUser(uuid, payload);

          if (!response || response?.status === 400) {
            throw new Error(
              response?.data?.errorMessage || "Something went wrong"
            );
          }
          setpasswordupdated(true);
          toast.success("Password set successfully");
        } catch (error) {
          toast.error(
            error?.response?.data?.errorMessage || "Something went wrong"
          );
        }
      }
    } else {
      if (isEmpty(password)) {
        setpassworderror(["Please enter password"]);
      } else if (strength !== 100) {
        setpassworderror(["Password strength must match"]);
      } else if (isEmpty(cpassword)) {
        setpassworderror(["Please enter confirm password"]);
      } else if (cpassword !== password) {
        setpassworderror(["Passwords must match"]);
      }
    }
  };

  const _verifyTenantUser = async () => {
    try {
      const response = await verifyTenantUser(uuid);
      if (response?.status === 400) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      } else {
        toast.success(response.message);
        setIsExist(true);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  useEffect(async () => {
    if (uuid) {
      try {
        const response = await verifyAdminInviteLink(uuid);
        if (response?.status === 400) {
          toast.error(response?.data?.errorMessage || "Something went wrong!");
          navigate("/login");
        } else {
          if (response.exists) {
            _verifyTenantUser();
          }
        }
      } catch (err) {
        toast.error(err?.message || "Something went wrong!");
      }
    } else {
      navigate("/login");
    }
  }, []);

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

  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData} overFlowYScroll="">
        {!isExist && (
          <div className="p-1">
            {passwordupdated && (
              <div>
                <h1 className="text-xl 2xl:text-3xl mt-8">Thank You!</h1>
                <p className="text-gray-400 text-sm 2xl:text-lg mt-5">
                  Your password has been set successfully. Kindly use the same
                  credentials to login.
                </p>
                <div className="mt-10">
                  <InvolvButton
                    type="submit"
                    classes={"w-full font-normal text-lg"}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </InvolvButton>
                </div>
              </div>
            )}

            {!passwordupdated && (
              <div className="">
                <h2 className="text-3xl mt-8">Setup your password</h2>
                {passworderror.length > 0 && (
                  <div className="rounded-md bg-red-50 p-4">
                    {passworderror.map((error) => {
                      return (
                        <div className="flex" key={error}>
                          <div className="flex-shrink-0">
                            <XCircleIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              {error}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-10 flex flex-col flex-1 space-y-6">
                  <div className="mt-1 relative rounded shadow-sm">
                    <input
                      autoFocus
                      onFocus={() => {
                        setshowpasswordstrength(true);
                      }}
                      onBlur={() => {
                        setshowpasswordstrength(false);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      onChange={handlePasswordChange}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className={
                        "h-12 outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-gray-300 text-gray-800"
                      }
                    />
                    <label
                      htmlFor="password"
                      className={[
                        "absolute flex items-center text-gray-400 text-opacity-80 transition-all duration-200 ease-in-out",
                        password
                          ? "text-xs px-2 -top-2 left-2 bg-white"
                          : "text-base p-2 top-1 left-0",
                      ].join(" ")}
                    >
                      Enter new password
                    </label>
                    {showpasswordstrength && (
                      <div className="absolute flex flex-col flex-1 p-4 z-20 rounded-md shadow-md space-y-5 z-100 bg-white top-10 right-16 mt-2 border border-gray-200 w-80">
                        <div className="font-semibold text-sm">
                          Your password must have:
                        </div>
                        <div className="flex flex-col flex-1 space-y-1">
                          {passwordrules.map((prule, index) => (
                            <div
                              key={index}
                              className="flex gap-2 text-green-600"
                            >
                              {prule.pass && (
                                <CheckIcon className="w-5 h-5 bg-green-600 rounded-full text-white scale-90 transform"></CheckIcon>
                              )}
                              <span
                                className={classNames(
                                  prule.pass
                                    ? " text-green-600 "
                                    : "text-gray-600 ",
                                  " text-xs"
                                )}
                              >
                                {prule.title}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="w-full flex flex-col flex-1">
                          <div className="font-semibold text-sm">Strength</div>
                          <div className="w-full bg-gray-200 h-1 mb-1 mt-1 rounded-md ">
                            <div
                              className={handleClassStrength(strength)}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-400">
                            Avoid passwords that are easy to guess or used with
                            other websites
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <img
                          src="/images/eye-open.svg"
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <img
                          src="/images/eye-close.svg"
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-1 relative rounded shadow-sm">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      name="cpassword"
                      id="cpassword"
                      value={cpassword}
                      onChange={(e) => {
                        setcpassword(e.target.value);
                      }}
                      className={
                        "h-12 outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-gray-300 text-gray-800"
                      }
                    />
                    <label
                      htmlFor="cpassword"
                      className={[
                        "absolute flex items-center text-gray-400 text-opacity-80 transition-all duration-200 ease-in-out",
                        cpassword
                          ? "text-xs px-2 -top-2 left-2 bg-white"
                          : "text-base p-2 top-1 left-0",
                      ].join(" ")}
                    >
                      Confirm password
                    </label>
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword2(!showPassword2)}
                    >
                      {showPassword2 ? (
                        <img
                          src="/images/eye-open.svg"
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <img
                          src="/images/eye-close.svg"
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-14">
                  <button
                    type="submit"
                    onClick={submitPasswords}
                    className="primaryBtn w-full h-12"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {isExist && (
          <div className="">
            <h1 className="text-xl 2xl:text-3xl mt-8">Thank You!</h1>
            <p className="text-gray-400 text-sm 2xl:text-lg mt-5">
              You have already registered once. Kindly use the same credentials
              to login.
            </p>
            <div className="mt-10">
              <InvolvButton
                type="submit"
                classes={"w-full font-normal text-lg"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </InvolvButton>
            </div>
          </div>
        )}
      </AuthLayout>
    </LayoutTransition>
  );
};

export default InvolvInviteAdmin;
