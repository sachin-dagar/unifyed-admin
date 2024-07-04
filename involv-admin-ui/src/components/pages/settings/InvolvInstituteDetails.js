import { useFormik, Formik, ErrorMessage } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../services/api/context/authContext/AuthContext";
import { apiProvider } from "../../../services/api/utilities/provider";
import FloatingLabelInput from "../../shared/FloatingLabelInput";
import InvolvAvatar from "../../shared/InvolvAvatar/InvolvAvatar";
import * as Yup from "yup";
import InvolvTenantProfileUploadImg from "./InvolvTenantProfileUploadImg";
import LocationSearch from "../../auth/LocationSearch";
import toast from "react-hot-toast";
import {
  getGeneralProfile,
  patchGeneralProfileUpdate,
} from "../../../services/api/general/GeneralServices";
import Loader from "../../shared/loader/Loader";
import InvolvButton from "../../shared/InvolvButton";

const InvolvInstituteDetails = () => {
  const { tenant, setUserProfile, userProfile } = useAuth();
  const [instituteImage, setInstituteImage] = useState(false);
  const [isIconUrlBtnLoading, setIsIconUrlBtnLoading] = useState(false);
  const [instituteData, setInstituteData] = useState({});
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isOpenUploadInstituteModal, setIsOpenUploadInstituteModal] =
    useState(false);

  const iconTenantUrlRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const closeUploadModal = () => {
    setIsOpenUploadInstituteModal(false);
  };

  const onChangeIconUrlTenant = async (event) => {
    if (event.target.files && event.target.files[0]) {
      if (beforeUpload(event.target.files[0])) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load", () => {
          setInstituteImage(reader.result);
        });
      }
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const onUploadIconUrlTenant = async (file) => {
    if (file) {
      setIsIconUrlBtnLoading(true);
      const formData = new FormData();
      formData.append("file", file, "filename.jpg");
      try {
        const response = await apiProvider.post(
          "api/tenant/uploadMedia",
          formData
        );
        if (response?.data?.errorMessage) {
          throw new Error(
            response.data?.errorMessage || "Something went wrong"
          );
        } else {
          const userprofileData = await getGeneralProfile();
          const tenantDetails = userprofileData?.tenantRoles?.find(
            (tnt) =>
              tnt?.tenant?.organizationName === tenant?.tenant?.organizationName
          );
          const tenantRoles = userProfile.tenantRoles?.map((tnt) => {
            if (
              tnt?.tenant?.organizationName === tenant?.tenant?.organizationName
            ) {
              return {
                ...tnt,
                tenant: {
                  ...tnt.tenant,
                  iconUrl: tenantDetails?.tenant?.iconUrl,
                },
              };
            }
            return tnt;
          });
          console.log("ROLES", tenantRoles);
          setUserProfile({
            ...userProfile,
            tenantRoles: tenantRoles,
          });
          setInstituteData({
            ...instituteData,
            iconTenantUrl: tenantDetails?.tenant?.iconUrl,
          });
          toast.success("Institute icon updated");
          setIsIconUrlBtnLoading(false);
          closeUploadModal();
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
        setIsIconUrlBtnLoading(false);
      }
    }
  };

  const onSaveUpdateHandler = async (values) => {
    const { _id } = values;
    delete values._id;
    delete values.iconUrl;
    delete values.iconTenantUrl;
    setIsBtnLoading(true);
    try {
      const profileUpdate = await patchGeneralProfileUpdate({ ...values }, _id);
      if (profileUpdate?.status === 400 || profileUpdate?.status === 500) {
        throw new Error(
          profileUpdate?.data?.errorMessage || "Something went wrong"
        );
      }
      const userprofileData = await getGeneralProfile();
      const tenantDetails = userprofileData?.tenantRoles?.find(
        (tnt) => tnt?.tenant?.tenantDomain === tenant?.tenant?.tenantDomain
      );
      setUserProfile({
        ...userProfile,
        tenantRoles: [...userprofileData?.tenantRoles],
      });
      setInstituteData({
        organizationName: tenantDetails?.tenant?.organizationName,
        domain: tenantDetails?.tenant?.tenantDomain,
        country: tenantDetails?.tenant?.country,
        iconTenantUrl: tenantDetails?.tenant?.iconUrl,
      });
      setIsBtnLoading(false);
      toast.success("Institute details update!");
    } catch (error) {
      setIsBtnLoading(false);
      toast.error(error?.message || "Something went wrong!");
    }
  };

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
        const tenantRoles = profileData?.tenantRoles.find((roles) => {
          return roles.tenant.tenantDomain === tenant?.tenant?.tenantDomain;
        });
        setInstituteData({
          organizationName: tenantRoles?.tenant?.organizationName,
          domain: tenantRoles?.tenant?.tenantDomain,
          country: tenantRoles?.tenant?.country,
          iconTenantUrl: tenantRoles?.tenant?.iconUrl,
        });
        setIsLoading(false);
        setInstituteImage(false);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  }, [tenant?.tenant?.tenantDomain]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        ...instituteData,
      }}
      enableReinitialize={false}
      validationSchema={Yup.object().shape({
        // INSTITUTE DATA
        organizationName: Yup.string().required(`Institute Name is required`),
        domain: Yup.string().required(`Domain is required`),
        country: Yup.string().required(`Location is required`),
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
          <div className="p-6 shadow-md bg-white rounded-lg mt-5 h-full">
            Institute Details
            <div className="grid grid-cols-8 mt-3 gap-5 w-4/5">
              <div
                className="col-span-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenUploadInstituteModal(!isOpenUploadInstituteModal);
                }}
              >
                <InvolvAvatar
                  imageUrl={instituteImage || instituteData?.iconTenantUrl}
                  showCamera={true}
                  name="iconTenantUrl"
                  customClass=""
                />
              </div>
              <InvolvTenantProfileUploadImg
                isOpenUploadModal={isOpenUploadInstituteModal}
                closeUploadModal={closeUploadModal}
                handleSave={onUploadIconUrlTenant}
                setCroppedImage={setInstituteImage}
                saveBtnLoader={isIconUrlBtnLoading}
                isZoom={instituteImage}
                profileImg={instituteImage || instituteData?.iconTenantUrl}
                chooseImage={() => iconTenantUrlRef.current.click()}
              />
              <input
                ref={iconTenantUrlRef}
                accept={"image/png, image/jpeg"}
                name="iconTenantUrl"
                type="file"
                hidden
                onChange={onChangeIconUrlTenant}
                className="form-control"
              />
              <div className="col-span-7 mb-5">
                <div className="grid grid-cols-2 gap-6 mt-2 mt-1">
                  <div className="flex mt-2 mt-1">
                    <div className="w-full">
                      <FloatingLabelInput
                        values={values}
                        type="text"
                        name="organizationName"
                        placeholder="Institute Name"
                      />
                      <ErrorMessage
                        component="div"
                        name="organizationName"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex mt-2 mt-1">
                    <div className="w-full">
                      <LocationSearch
                        address={values?.country}
                        name="country"
                        handleChange={(val) =>
                          setValues({ ...values, country: val })
                        }
                        error={errors?.country}
                        icon={false}
                        floatingLabel={true}
                        customClass={""}
                      />
                      <ErrorMessage
                        component="div"
                        name="country"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex mt-2 mt-1">
                    <div className="w-full">
                      <FloatingLabelInput
                        values={values}
                        type="text"
                        name="domain"
                        placeholder="Domain"
                        disabled
                      />
                      <ErrorMessage
                        component="div"
                        name="domain"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <InvolvButton
                    type="submit"
                    disabled={!dirty}
                    loading={isBtnLoading}
                  >
                    Save
                  </InvolvButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default InvolvInstituteDetails;
