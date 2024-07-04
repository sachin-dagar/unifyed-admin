import React, { useState, useEffect } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/outline";
import { apiProvider } from "../../services/api/utilities/provider";
import toast from "react-hot-toast";
import { isEmpty } from "lodash";
import AuthLayout from "../../Layout/AuthLayout";
import LayoutTransition from "../shared/LayoutTransition";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const carouselData = [
  {
    name: "Step 1",
    image: "/images/signup-image-1.png",
    href: "#",
    status: "current",
    mainText: "Manage your password",
    subText: "Enhance Your Security and reduce Help Desk Calls by 80%",
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
const SetUpPassword = ({ handleloginnow }) => {
  const [showpasswordstrength, setshowpasswordstrength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [strength, setstrength] = useState(0);
  const [passworderror, setpassworderror] = useState(false);
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
  const navigate = useNavigate();

  const signupresponse = JSON.parse(localStorage.getItem("signUpresponse"));

  useEffect(() => {
    // redirect the user to login page if validationCode is not available
    if (!localStorage.getItem("validationCode")) navigate("/signup");
  }, []);

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
    if (!isEmpty(password) && !isEmpty(cpassword)) {
      if (strength === 100) {
        if (password !== cpassword) {
          setpassworderror(true);
        } else {
          try {
            const response = await axios({
              url: `${apiProvider.serverBaseUrl}/api/tenant/validatesignup`,
              method: "POST",
              data: {
                password: password,
                passwordConfirm: cpassword,
                tenantDomain: signupresponse.tenantDomain,
                email: signupresponse.email,
                validationCode: parseInt(
                  localStorage.getItem("validationCode")
                ),
              },
            });
            if (response.data && response.data.active == true) {
              setpasswordupdated(true);
              toast.success("Password set successfully");
              // remove the keys whatever you store during signup process.
              localStorage.removeItem("signUpresponse");
              localStorage.removeItem("validationCode");
            }
          } catch (error) {
            toast.error(
              error?.response?.data?.errorMessage || "Something went wrong"
            );
          }
        }
      } else {
        toast.error("Please match password strength");
      }
    } else {
      toast.error("Password fields required!");
    }
  };
  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData} overFlowYScroll="">
        <div className="p-1">
          {passwordupdated && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Password updated
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Your password has been updated.</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                    <NavLink
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-900 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 sm:text-sm"
                    >
                      Login
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!passwordupdated && (
            <div className="">
              <h1 className="text-3xl mt-8">Setup your password for</h1>
              <p className="text-indigo-900 text-base font-medium  mt-1">
                {signupresponse?.email}
              </p>
              {passworderror && (
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
                        Passwords must match.
                      </h3>
                    </div>
                  </div>
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
                        {/* <div className="flex gap-2 text-green-600">
                                  <CheckIcon className="w-5 h-5 bg-green-600 rounded-full text-white scale-90 transform"></CheckIcon>
                                  <span className="text-xs text-green-600">8 or more characters</span>
                              </div>
                              <div className="flex gap-2 text-green-600">
                                  <CheckIcon className="w-5 h-5 bg-green-600 rounded-full text-white scale-90 transform "></CheckIcon>
                                  <span className="text-xs text-green-600">At least one numeric number</span>
                              </div>
                              <div className="flex gap-2 text-green-600">
                                  <CheckIcon className="w-5 h-5 bg-green-600 rounded-full text-white scale-90 transform"></CheckIcon>
                                  <span className="text-xs text-green-600">At least one lower case character</span>
                              </div>
                              <div className="flex gap-2 text-green-600">
                                  <CheckIcon className="w-5 h-5 bg-green-600 rounded-full text-white scale-90 transform"></CheckIcon>
                                  <span className="text-xs text-green-600">At least one upper case character</span>
                              </div>
                              <div className="flex gap-2 text-green-600">
                                  <CheckIcon className="w-5 h-5 bg-green-600 rounded-full text-white scale-90 transform"></CheckIcon>
                                  <span className="text-xs text-green-600">At least one special character</span>
                              </div> */}
                      </div>
                      <div className="w-full flex flex-col flex-1">
                        <div className="font-semibold text-sm">Strength</div>
                        <div className="w-full bg-gray-200 h-1 mb-1 mt-1 rounded-md ">
                          <div
                            className={handleClassStrength(strength)}
                            // style={{ width: strength + "%" }}
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
                  onClick={() => {
                    submitPasswords();
                  }}
                  className="primaryBtn text-xl w-full h-12"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </AuthLayout>
    </LayoutTransition>
  );
};

export default SetUpPassword;
