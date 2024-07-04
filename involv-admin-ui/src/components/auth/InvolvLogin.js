import {
  ExclamationIcon,
  LockClosedIcon,
  MailIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import { AuthService } from "../../services/api/auth/AuthService";
import { useAuth } from "../../services/api/context/authContext/AuthContext";
import InvolvButton from "../shared/InvolvButton";
import LayoutTransition from "../shared/LayoutTransition";

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

function InvolvLogin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [inputerror, setinputerror] = useState(false);
  const [invalidcred, setinvalidcred] = useState(false);
  const [showprogress, setshowprogress] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn, setUserProfile, setUserPermission } = useAuth();
  const [searchParams] = useSearchParams();
  const gadgetId = searchParams?.get("gadgetId");

  const handleloginnow = async () => {
    setinputerror(false);
    setinvalidcred(false);
    setshowprogress(false);
    if (username && password) {
      setshowprogress(true);
      try {
        const response = await AuthService.authenticate(username, password);
        if (response.status && response.status == 401) {
          setinvalidcred(true);
          setshowprogress(false);
          return;
        }
        setLoggedIn(true);
        let userprofile = await AuthService.userprofile();
        const permission = await AuthService.userPermission();
        setUserPermission(permission);
        setUserProfile(userprofile);
        setshowprogress(false);
        navigate(`/tenantlist${gadgetId ? "?gadgetId=" + gadgetId : ""}`);
      } catch (ex) {
        if (ex.response?.status == 401) {
          setinvalidcred(true);
        }
        console.log("Error block ", ex);
        setshowprogress(false);
      }
    } else {
      setinputerror(true);
    }
  };

  useEffect(() => {
    if (invalidcred) {
      setusername("");
      setpassword("");
    }
  }, [invalidcred]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LayoutTransition>
      <AuthLayout carouselData={carouselData}>
        <div className="p-1">
          <h1 className="text-xl 2xl:text-3xl mt-8">Login</h1>
          <p className="text-gray-400 text-sm 2xl:text-lg mt-2">
            Login to stay updated.
          </p>
          {inputerror && (
            <div className="rounded-md bg-yellow-50 p-2 mt-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-xs 2xl:text-sm font-medium text-yellow-800">
                    Please fill your credentials before submitting.
                  </h3>
                </div>
              </div>
            </div>
          )}
          {invalidcred && (
            <div className="rounded-md bg-red-50 p-2 mt-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-xs 2xl:text-sm font-medium text-red-800">
                    Invalid Credentials.
                  </h3>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col flex-1 gap-5 mt-5">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400 "></MailIcon>
                {/* <img src="/images/domain-icon.svg" className="w-5 h-5"/> */}
              </div>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                className="h-9 2xl:h-12 block w-full pl-10 text-sm 2xl:text-lg border-gray-300 rounded placeholder-gray-500 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
                placeholder="Email"
                autoFocus
              />
            </div>

            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400 "></LockClosedIcon>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    if (password.length > 0 && password.trim() !== "") {
                      handleloginnow();
                    }
                  }
                }}
                className="h-9 2xl:h-12  block w-full pl-10 text-sm 2xl:text-lg border-gray-300 rounded placeholder-gray-500 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
                placeholder="Password"
              />
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
          </div>
          {/* FORGET PASSWORD  */}
          <div className="flex justify-end my-3">
            <Link
              to="/forgot-password"
              className="underline text-sm 2xl:text-base text-indigo-900"
            >
              Forgot Password
            </Link>
          </div>
          <div className="mt-7">
            <InvolvButton
              type="submit"
              classes={"w-full font-normal text-lg"}
              onClick={() => {
                handleloginnow();
              }}
              loading={showprogress}
            >
              Login
            </InvolvButton>
          </div>

          <div className="flex gap-2 my-7 text-sm 2xl:text-lg font-normal">
            <span>No account yet? </span>
            <NavLink to="/signup" className="text-indigo-900 underline">
              Register here
            </NavLink>
          </div>

          <div className="w-full text-sm 2xl:text-sm py-3 text-left text-gray-400 font-normal">
            By signing on to this portal, you agree to abide by its{" "}
            <a
              className="text-indigo-900 font-normal underline"
              href="https://www.unifyed.com/terms-of-use"
              target="_blank"
            >
              Terms &amp; Conditions
            </a>{" "}
            violations could lead to restriction on portal privileges and/or
            disciplinary action.
          </div>
        </div>
      </AuthLayout>
    </LayoutTransition>
  );
}

export default InvolvLogin;
