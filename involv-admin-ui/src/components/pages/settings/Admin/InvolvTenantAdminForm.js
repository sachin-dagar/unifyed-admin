import { PlusIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  getAdminInviteById,
  postAdminInvite,
  postAdminInviteById,
} from "../../../../services/api/admin/AdminService";
import { useAuth } from "../../../../services/api/context/authContext/AuthContext";
import InvolvTenantBreadcrumbs from "../../../route/InvolvTenantBreadcrumbs";
import InvolvButton from "../../../shared/InvolvButton";

const InvolvTenantAdminForm = () => {
  const { tenant } = useAuth();
  const { adminId } = useParams();
  const [adminForm, setAdminForm] = useState({
    fullName: "",
    email: "",
    role: "",
  });
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  const [roles, setRoles] = useState([
    {
      label: "Super Admin",
      value: "superadmin",
    },
    {
      label: "Tenant Administrator",
      value: "tenantadministrator",
    },
    {
      label: "Moderator",
      value: "moderator",
    },
    {
      label: "Technical Staff",
      value: "technicalstaff",
    },
    {
      label: "Advisor",
      value: "advisor",
    },
  ]);

  const navigate = useNavigate();

  useEffect(async () => {
    if (adminId) {
      try {
        const response = await getAdminInviteById(adminId);
        if (response?.data?.errorMessage) {
          throw (
            new Error(
              response?.data?.errorMessage || response?.data?.validationMessage
            ) || "Something went wrong"
          );
        }
        setAdminForm({
          fullName: response?.fullName,
          email: response?.email,
          role: response?.role,
        });
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  }, [tenant?.tenant?.tenantDomain]);

  const formik = useFormik({
    initialValues: { ...adminForm },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Email ID must be a valid email")
        .required("Email ID is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      if (termsAndCondition) {
        if (adminId) {
          // EDIT API
          const filterValue = JSON.parse(
            localStorage.getItem("InviteAdminFilter")
          );
          try {
            const response = await postAdminInviteById(adminId, { ...values });
            if (response?.data?.errorMessage) {
              throw new Error(
                response?.data?.errorMessage || "Something went wrong"
              );
            }
            toast.success("Invitation updated successfully");
            navigate("/tenant/admins", { state: { ...filterValue } });
          } catch (error) {
            toast.error(error?.message || "Something went wrong");
          }
        } else {
          try {
            const response = await postAdminInvite({
              ...values,
              email: values?.email?.toLowerCase(),
            });
            if (response?.status == 400 || response?.data?.errorMessage) {
              throw new Error(
                response?.data.errorMessage || "Something went wrong"
              );
            }
            toast.success(response?.message);
            navigate("/tenant/admins");
          } catch (error) {
            toast.error(error?.message || "Something went wrong");
          }
        }
      } else {
        toast.error("Please accept the terms of service.");
      }
    },
  });

  return (
    <>
      <div className="w-full flex flex-col mb-6">
        <div className="font-medium text-grayInvolv-900 text-lg mb-2">
          {adminId ? "Edit Admin" : "Invite Admin"}
        </div>
        <InvolvTenantBreadcrumbs />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white py-6 px-6 text-gray-800">
        <form className="w-full">
          <h2 className="text-lg">Enter details</h2>
          <div className="grid grid-cols-3 gap-5 mt-4 mb-10">
            <div className="w-full relative flex flex-col">
              <input
                type="text"
                id="fullName"
                className={[
                  "h-12 w-full border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
                  adminId ? "text-gray-400" : " ",
                ].join(" ")}
                name="fullName"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.setFieldValue("fullName", e.target.value.trimStart());
                }}
                value={formik.values?.fullName}
                disabled={adminId}
              />
              <label
                className={[
                  "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
                  formik.values?.fullName
                    ? "text-xs px-2 -top-1 left-2 bg-white"
                    : "text-sm p-2 top-1.5 left-0",
                ].join(" ")}
                htmlFor="fullName"
              >
                Full Name
              </label>
              {formik.errors?.fullName && formik.touched?.fullName && (
                <span className="text-red-500 text-xs absolute -bottom-5 left-1.5 w-full">
                  {formik.errors.fullName}
                </span>
              )}
            </div>

            <div className="w-full relative">
              <input
                type="text"
                id="email"
                className={[
                  "h-12 w-full border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
                  adminId ? "text-gray-400" : " ",
                ].join(" ")}
                name="email"
                onBlur={formik.handleBlur}
                value={formik.values?.email}
                onChange={(e) => {
                  formik.setFieldValue(
                    "email",
                    e.target.value.trimStart().toLowerCase()
                  );
                }}
                disabled={adminId}
              />
              <label
                className={[
                  "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
                  formik.values?.email
                    ? "text-xs px-2 -top-1 left-2 bg-white"
                    : "text-sm p-2 top-1.5 left-0",
                ].join(" ")}
                htmlFor="email"
              >
                Email ID
              </label>
              {formik.errors?.email && formik.touched?.email && (
                <span className="text-red-500 text-xs absolute -bottom-5 left-1.5 w-full">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="flex relative">
              <h2 className="text-lg mb-2">Assign Role</h2>
              {formik.errors?.role && formik.touched?.role && (
                <span className="text-red-500 text-xs absolute -bottom-1.5 w-full">
                  {formik.errors?.role}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-5 mt-4 mb-12">
              {roles.map((role) => (
                <div className="w-full relative flex items-center gap-4 mb-10">
                  <input
                    type="radio"
                    name="role"
                    id={role?.value}
                    className="cursor-pointer hidden"
                    checked={formik?.values?.role === role?.label}
                    value={role?.label}
                    onChange={formik.getFieldProps("role").onChange}
                  />
                  <label
                    htmlFor={role?.value}
                    className={`border p-2 rounded-full w-2 h-2 flex justify-center items-center ${
                      formik?.values?.role === role?.label
                        ? "border-indigo-900"
                        : "border-gray-500"
                    }`}
                  >
                    {formik?.values?.role === role?.label && (
                      <span className="rounded-full p-1 bg-indigo-900 max-w-1 max-h-1"></span>
                    )}
                  </label>
                  <label
                    className="text-sm cursor-pointer"
                    htmlFor={role?.value}
                  >
                    {role?.label}
                    <p className="text-xs text-gray-500 absolute">
                      This role is best for Owners and system Administrators
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-5 pb-3 border-t-2 flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded"
              name="termAndCondition"
              id="termAndCondituon"
              checked={termsAndCondition}
              onClick={() => setTermsAndCondition(!termsAndCondition)}
            />
            <label htmlFor="termAndCondition" className="text-sm">
              I agree to the{" "}
              <a
                href="https://unifyed.com/terms-of-use"
                target="_blank"
                className="text-indigo-900 underline"
              >
                Terms and Service
              </a>{" "}
              and{" "}
              <a
                href="https://unifyed.com/privacy-policy"
                target="_blank"
                className="text-indigo-900 underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>
        </form>
      </div>
      <div className="w-full flex justify-end mt-3 items-center gap-4">
        <button
          onClick={() =>
            navigate("/tenant/admins", {
              state: JSON.parse(localStorage.getItem("InviteAdminFilter")),
            })
          }
          className="text-gray-400"
        >
          Cancel
        </button>
        <InvolvButton type="submit" onClick={formik.handleSubmit}>
          {adminId ? "Edit Invite" : "Send Invite"}
        </InvolvButton>
      </div>
    </>
  );
};

export default InvolvTenantAdminForm;
