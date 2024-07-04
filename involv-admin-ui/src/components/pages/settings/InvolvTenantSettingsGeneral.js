import React, { useState, useRef, useEffect } from "react";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import {
  UserCircleIcon,
  CogIcon,
  ClipboardListIcon,
  LockClosedIcon,
  CameraIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import InvolvAvatar from "../../shared/InvolvAvatar/InvolvAvatar";
import FloatingLabelInput from "../../shared/FloatingLabelInput";
import InvolvSelect from "../../shared/InvolvSelect/InvolvSelect";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import toast from "react-hot-toast";
import {
  getGeneralProfile,
  patchGeneralProfileUpdate,
  postGeneralChangePassword,
} from "../../../services/api/general/GeneralServices";
import InvolvButton from "../../shared/InvolvButton";
import LocationSearch from "../../../components/auth/LocationSearch";
import { apiProvider } from "../../../services/api/utilities/provider";
import PhoneInput from "react-phone-input-2";
import Loader from "../../shared/loader/Loader";
import LayoutTransition from "../../shared/LayoutTransition";
import {
  accountPreferences,
  lockIcon,
  profileIcon,
  loginActivityIcon,
} from "../../../AppIcons";
import InvolvComingSoon from "../../shared/InvolvComingSoon";
import InvolvTenantProfileUploadImg from "./InvolvTenantProfileUploadImg";
import useLocalStorage from "../../../hooks/useLocalStorage";
import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
const NewPasswordField = ({
  setShowPasswordStrength,
  showPasswordStrength,
  passwordRules,
  strength,
  name,
  setStrength,
  setPasswordRules,
}) => {
  const formikProps = useFormikContext();
  const handleChangePassword = (evt) => {
    formikProps.setFieldValue("password", evt.target.value);
    let rules = passwordRules;
    setStrength(0);
    let curstr = 0;
    rules.map((rule) => {
      rule.pass = false;
      rule.pass = rule.func(evt.target.value);
      if (rule.pass == true) {
        curstr += 20;
      }
    });
    setStrength(curstr);
    setPasswordRules([...rules]);
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

  return (
    <div className="w-full relative">
      <FloatingLabelInput
        onFocus={() => setShowPasswordStrength(true)}
        onBlur={() => setShowPasswordStrength(false)}
        onChange={handleChangePassword}
        type="password"
        autoComplete="off"
        autoCorrect="off"
        name={name}
        placeholder="New Password"
      />
      {/* PASSWORD STRENGTH METER  */}
      {showPasswordStrength && (
        <div className="absolute flex flex-col flex-1 p-4 z-20 rounded-md shadow-md space-y-5 z-100 bg-white top-10 right-16 mt-2 border border-gray-200 w-80">
          <div className="font-semibold text-sm">Your password must have:</div>
          <div className="flex flex-col flex-1 space-y-1">
            {passwordRules.map((prule, index) => (
              <div key={index} className="flex gap-2 text-green-600">
                {prule.pass && (
                  <CheckIcon className="w-5name h-5 bg-green-600 rounded-full text-white scale-90 transform"></CheckIcon>
                )}
                <span
                  className={classNames(
                    prule.pass ? " text-green-600 " : "text-gray-600 ",
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
                // style={{ width: strength + "%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400">
              Avoid passwords that are easy to guess or used with other websites
            </p>
          </div>
        </div>
      )}

      <ErrorMessage
        component="div"
        name="password"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

const ResetPassword = ({ onChangePassword, isLoading }) => {
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [strength, setStrength] = useState(0);
  const [passwordRules, setPasswordRules] = useState([
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

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        currentPassword: Yup.string().required(`Current password is required`),
        password: Yup.string()
          .matches(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
            "Please match the password conditions"
          )
          .min(8)
          .required(`New Password is required`),
        confirmPassword: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            "New password and confirm password must match"
          )
          .required(`Confirm Password is required`),
      })}
      onSubmit={(values, { resetForm }) => {
        onChangePassword(
          {
            ...values,
          },
          resetForm
        );
      }}
      enableReinitialize={true}
    >
      {({ values, handleSubmit, dirty }) => (
        <>
          <div className="col-span-4 lg:col-span-3">
            <div className="px-6 py-6 shadow-md bg-white rounded-lg h-658 w-full">
              <span className="text-18px">Change Password</span>
              <div className="grid grid-cols-8 mt-3 gap-5 h-full w-full">
                <div className="col-span-8 mb-4 w-full h-full">
                  <form className="flex flex-col justify-between h-full w-full">
                    <div className="grid grid-cols-2 gap-6 mt-2 mt-1">
                      <div className="flex mt-2 mt-1">
                        <div className="w-full">
                          <FloatingLabelInput
                            values={values}
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                          />
                          <ErrorMessage
                            component="div"
                            name="currentPassword"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div />
                      <div className="flex mt-2 mt-1">
                        <NewPasswordField
                          setShowPasswordStrength={setShowPasswordStrength}
                          showPasswordStrength={showPasswordStrength}
                          passwordRules={passwordRules}
                          strength={strength}
                          name="password"
                          setStrength={setStrength}
                          setPasswordRules={setPasswordRules}
                        />
                      </div>
                      <div />
                      <div className="flex mt-2 mt-1">
                        <div className="w-full">
                          <FloatingLabelInput
                            values={values}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                          />
                          <ErrorMessage
                            component="div"
                            name="confirmPassword"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div />
          <div />
          <div />
          <div className="flex justify-end mt-5 w-full">
            <InvolvButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !dirty || strength < 100}
              loading={isLoading}
            >
              Save
            </InvolvButton>
          </div>
        </>
      )}
    </Formik>
  );
};

const navigationMenu = [
  {
    name: "Profile",
    href: "",
    icon: profileIcon,
    current: true,
  },
  {
    name: "Account Preferences",
    href: "",
    icon: accountPreferences,
    current: false,
  },
  {
    name: "Login Activity",
    href: "",
    icon: loginActivityIcon,
    current: false,
  },
  {
    name: "Change Password",
    href: "",
    icon: lockIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvolvTenantSettingsGeneral() {
  const { tenant, setUserProfile, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isIconUrlBtnLoading, setIsIconUrlBtnLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profileImage, setProfileImage] = useState(false);
  const [instituteData, setInstituteData] = useState({});
  const [navigation, setNavigation] = useState(navigationMenu);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const [tempNav, setTempNav] = useState(0);
  const iconUrlRef = useRef(null);

  useEffect(async () => {
    setIsLoading(true);
    if (tenant?.tenant?.tenantDomain) {
      try {
        const profileData = await getGeneralProfile();
        if (profileData?.status === 400) {
          throw new Error(
            profileData?.data?.errorMessage || "Something went wrong"
          );
        }
        if (profileData?._id) {
          const tenantRoles = profileData?.tenantRoles.find((roles) => {
            return roles.tenant.tenantDomain === tenant?.tenant?.tenantDomain;
          });
          setProfileData({
            _id: profileData?._id,
            fullName: profileData?.fullName,
            // jobTitle: tenantRoles?.role,
            phoneNumber: profileData?.phoneNumber,
            email: profileData?.email,
            iconUrl: profileData?.iconUrl,
          });
          setIsLoading(false);
          setProfileImage(false);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.message || "Something went wrong!");
      }
    }
  }, [tenant?.tenant?.tenantDomain]);

  // RESET PASSWORD
  const onChangePassword = async (values, resetForm) => {
    try {
      setIsBtnLoading(true);
      const changePasswordData = await postGeneralChangePassword({ ...values });
      if (
        changePasswordData?.data?.errorMessage ||
        changePasswordData?.status === 412
      ) {
        throw new Error(
          changePasswordData?.data?.errorMessage || "Something went wrong"
        );
      }
      toast.success("Password changed!");
      resetForm();
      setIsBtnLoading(false);
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
      setIsBtnLoading(false);
    }
  };

  const onSaveUpdateHandler = async (values) => {
    const { _id } = values;
    delete values._id;
    delete values.iconUrl;
    try {
      setIsBtnLoading(true);
      const profileUpdate = await patchGeneralProfileUpdate({ ...values }, _id);
      if (profileUpdate?.status === 400 || profileUpdate?.status === 500) {
        throw new Error(
          profileUpdate?.data?.errorMessage || "Something went wrong"
        );
      }
      setUserProfile({
        ...userProfile,
        fullName: profileUpdate?.fullName,
        // jobTitle: profileUpdate?.jobTitle,
        phoneNumber: profileUpdate?.phoneNumber,
        email: profileUpdate?.email,
        iconUrl: profileUpdate?.iconUrl,
      });
      setProfileData({
        _id: profileUpdate?._id,
        fullName: profileUpdate?.fullName,
        // jobTitle: tenantRoles?.role,
        phoneNumber: profileUpdate?.phoneNumber,
        email: profileUpdate?.email,
        iconUrl: profileUpdate?.iconUrl,
      });
      setIsBtnLoading(false);
      toast.success("Profile update!");
    } catch (error) {
      setIsBtnLoading(false);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const handleSideBarClick = (index) => {
    const newNavItems = [...navigation];
    newNavItems.map((nav) => {
      nav.current = false;
      return nav;
    });
    newNavItems[index].current = true;
    setNavigation(newNavItems);
    setTempNav(index);
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const onChangeIconUrl = async (event) => {
    if (event.target.files && event.target.files[0]) {
      if (beforeUpload(event.target.files[0])) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load", () => {
          setProfileImage(reader.result);
        });
      }
    }
  };

  const onUploadIconUrl = async (file) => {
    if (file) {
      setIsIconUrlBtnLoading(true);
      const formData = new FormData();
      formData.append("file", file, "filename.jpg");
      try {
        const response = await apiProvider.post(
          "api/user/uploadProfilePic",
          formData
        );
        if (response?.data?.errorMessage) {
          throw new Error(
            response.data?.errorMessage || "Something went wrong"
          );
        } else {
          const userprofileData = await getGeneralProfile();
          setProfileData({
            ...profileData,
            iconUrl: userprofileData?.iconUrl,
          });
          setUserProfile({
            ...userProfile,
            iconUrl: userprofileData?.iconUrl,
          });
          toast.success("Profile icon updated");
        }
        setIsIconUrlBtnLoading(false);
        closeUploadModal();
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
        setIsIconUrlBtnLoading(false);
      }
    }
  };

  const closeUploadModal = () => {
    setProfileImage(false);
    setIsOpenUploadModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <LayoutTransition>
      <div>
        <InvolvTenantBreadcrumbs />
        <div className="grid grid-cols-4 gap-5 mt-10">
          <div className="col-span-4 lg:col-span-1  p-6 bg-white rounded-lg shadow-md">
            My Profile
            <nav className="mt-4 space-y-3">
              {navigation.map((item, i) => (
                <NavLink
                  key={item.name}
                  to={item.href || ""}
                  className={`${
                    item.current
                      ? " text-indigo-900 bg-indigo-50 border-none"
                      : "  hover:bg-indigo-50 "
                  } 
                  flex items-center py-y px-3 2xl:px-4 text-sm rounded-md h-12 2xl:h-14 border group`}
                  onClick={() => handleSideBarClick(i)}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      {/* <item.icon
                        className={classNames(
                          item?.current
                            ? "text-indigo-900"
                            : "text-gray-400 group-hover:text-indigo-900 ",
                          "flex-shrink-0 mr-2 h-6 w-6"
                        )}
                        aria-hidden="true"
                      /> */}
                      <span
                        className={classNames(
                          item?.current
                            ? "text-indigo-900"
                            : "text-gray-400 group-hover:text-indigo-900 ",
                          " W-11 mr-2"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className=" font-normal text-sm 2xl:text-base">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  {item?.current && (
                    <div className=" rounded-lg bg-indigo-700 border-indigo-900">
                      &nbsp;
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {tempNav === 0 && (
            <Formik
              initialValues={{
                ...profileData,
                ...instituteData,
              }}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                fullName: Yup.string().required(`Full Name is required`),
                // jobTitle: Yup.string().required(`Job Title is required`),
                phoneNumber: Yup.string()
                  .max(16, "Phone Number can not be more than 16 numbers")
                  .min(8, "Phone Number must be at least 8 numbers")
                  .required("Phone Number is required"),

                email: Yup.string().required(`Email is required`),
                // INSTITUTE DATA
              })}
              onSubmit={(values, { resetForm }) => {
                onSaveUpdateHandler({
                  ...values,
                  tenantDomain: tenant?.tenant?.tenantDomain,
                });
              }}
            >
              {({
                values,
                setValues,
                handleSubmit,
                dirty,
                errors,
                touched,
                setFieldValue,
                handleBlur,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-between col-span-4 lg:col-span-3 h-658"
                >
                  <div className="p-6 shadow-md bg-white rounded-lg h-full flex flex-col justify-between">
                    <div>
                      <span>Personal Information</span>
                      <div className="grid grid-cols-8 mt-3 gap-5">
                        <div className="lg:col-span-2">
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpenUploadModal(!isOpenUploadModal);
                            }}
                          >
                            <InvolvAvatar
                              imageUrl={
                                profileImage ||
                                profileData?.iconUrl ||
                                "/images/IconsProfile.svg"
                              }
                              // onChange={onUploadIconUrl}
                              showCamera={true}
                              // name="iconUrl"
                              customClass=""
                            />
                          </div>
                        </div>
                        <InvolvTenantProfileUploadImg
                          isOpenUploadModal={isOpenUploadModal}
                          closeUploadModal={closeUploadModal}
                          handleSave={onUploadIconUrl}
                          setCroppedImage={setProfileImage}
                          saveBtnLoader={isIconUrlBtnLoading}
                          isZoom={profileImage}
                          profileImg={profileImage || profileData?.iconUrl}
                          chooseImage={() => iconUrlRef.current.click()}
                        />
                        <input
                          ref={iconUrlRef}
                          accept={"image/png, image/jpeg"}
                          name="iconUrl"
                          type="file"
                          hidden
                          onChange={onChangeIconUrl}
                          className="form-control"
                        />
                        <div className="col-span-8 mb-5">
                          <div className="grid grid-cols-2 gap-6 mt-2">
                            <div className="flex mt-2">
                              <div className="w-full">
                                <FloatingLabelInput
                                  values={values}
                                  type="text"
                                  name="fullName"
                                  placeholder="Full Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  name="fullName"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                            </div>
                            {/* <div className="flex mt-2 mt-1">
                          <div className="w-full">
                            <FloatingLabelInput
                              values={values}
                              type="text"
                              name="jobTitle"
                              placeholder="Job Title"
                            />
                            <ErrorMessage
                              component="div"
                              name="jobTitle"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </div> */}
                            <div className="flex mt-1 pt-1">
                              <div className="w-full">
                                <div className="relative border rounded border-white border-opacity-25">
                                  <PhoneInput
                                    country={"us"}
                                    value={values.phoneNumber}
                                    countryCodeEditable={false}
                                    dropdownClass="h-40 w-80 rounded"
                                    buttonClass="focus:ring-indigo-500 focus:border-indigo-500 w-11 bg-white border-0 top-1 bottom-1 left-1"
                                    placeholder=""
                                    inputClass="py-2 h-12 text-lg focus:ring-indigo-500 focus:border-indigo-500 w-full pl-12 border-gray-200 rounded placeholder-gray-500"
                                    masks={{
                                      fr: "(...) ..-..-..",
                                      at: "(....) ...-....",
                                    }}
                                    onChange={(phone) => {
                                      touched.phoneNumber = true;
                                      setFieldValue("phoneNumber", phone);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  <label
                                    className={[
                                      "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out z-10",
                                      "text-xs px-2 -top-2 left-2 bg-white",
                                    ].join(" ")}
                                    htmlFor="phoneNumber"
                                  >
                                    Mobile Number
                                  </label>
                                </div>
                                {errors.phoneNumber && (
                                  <div className="text-red-500 text-xs">
                                    {errors.phoneNumber}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex mt-2 mt-1">
                              <div className="w-full">
                                <FloatingLabelInput
                                  values={values}
                                  type="text"
                                  disabled={true}
                                  name="email"
                                  placeholder="Work Email"
                                />
                                <ErrorMessage
                                  component="div"
                                  name="email"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-5">
                        <InvolvButton
                          type="submit"
                          disabled={
                            isBtnLoading ||
                            (profileData.phoneNumber === values.phoneNumber &&
                              (touched.phoneNumber === true ? false : !dirty))
                          }
                          // disabled={!dirty}
                          loading={isBtnLoading}
                        >
                          Save
                        </InvolvButton>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}

          {tempNav === 1 && (
            <div className="col-span-4 lg:col-span-3 shadow-md">
              <InvolvComingSoon />
            </div>
          )}
          {tempNav === 2 && (
            <div className="col-span-4 lg:col-span-3 shadow-md">
              <InvolvComingSoon />
            </div>
          )}

          {tempNav === 3 && (
            <ResetPassword
              onChangePassword={onChangePassword}
              isLoading={isBtnLoading}
            />
          )}
        </div>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantSettingsGeneral;
