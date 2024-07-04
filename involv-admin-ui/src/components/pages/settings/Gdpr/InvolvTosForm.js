import { PlusIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import InvolvCustomBreadCrumb from "../../../route/InvolvCustomBreadCrumb";
import InvolvButton from "../../../shared/InvolvButton";
import InvolvTenantModal from "../../../shared/InvolvTenantModal";
import {
  postGDPR,
  getGDPRById,
  patchGDPRById,
} from "../../../../services/api/gdpr/GDPRService";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import InvolvSwitchButton from "../../../shared/InvolvSwitchButton";
import { apiProvider } from "../../../../services/api/utilities/provider";

const InvolvTosForm = () => {
  const [form$, setForm$] = useState({
    title: "",
    content: "",
    rawContent: "",
  });

  const navigate = useNavigate();
  const { gdprId } = useParams();
  const [beforeEditContent, setBeforeEditContent] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openToggleModal, setOpenToggleModal] = useState(false);
  const [beforeUpdateData, setBeforeUpdateData] = useState({});
  const [enabled, setEnabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [customBreadCrumb, setCustomBreadCrumb] = useState([
    { label: "Unite", path: "/" },
    { label: "Settings", path: "/tenant/settings" },
    {
      label: "Custom Terms of Service",
      path: "/tenant/settings/custom-terms-of-service",
    },
  ]);
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            apiProvider
              .post(`api/user/uploadMedia`, body)
              .then((res) => {
                resolve({
                  default: res.original,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  useEffect(async () => {
    handelBreadCrumb();
    if (gdprId) {
      try {
        const response = await getGDPRById(gdprId);
        if (response?.data?.errorMessage) {
          throw (
            new Error(
              response?.data?.errorMessage || response?.data?.validationMessage
            ) || "Something went wrong"
          );
        }
        setForm$({
          title: response?.data.title,
          content: response?.data.content,
        });
        setEnabled(response?.data.isActive);
        setBeforeEditContent(response?.data.content);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  }, [gdprId]);

  const formik = useFormik({
    initialValues: { ...form$ },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(50, "Title can not be more than 50 characters"),
      content: Yup.string().required("Content is required"),
      rawContent: Yup.string().max(
        5000,
        "Content can not be more than 5000 characters"
      ),
    }),
    onSubmit: async (values) => {
      if (gdprId) {
        if (beforeEditContent !== values.content) {
          setOpenModalUpdate(true);
          setBeforeUpdateData(values);
        } else {
          onUpdate(values);
        }
      } else {
        onSave(values);
      }
    },
  });

  const handelBreadCrumb = async () => {
    if (gdprId) {
      setCustomBreadCrumb([...customBreadCrumb, { label: "Edit", path: null }]);
    } else {
      setCustomBreadCrumb([
        ...customBreadCrumb,
        { label: "Add New", path: null },
      ]);
    }
  };

  const onSave = async (payload) => {
    try {
      setBtnLoading(true);
      const response = await postGDPR({ ...payload, status: enabled });
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      toast.success(response?.message);
      setBtnLoading(false);
      navigate("/tenant/settings/custom-terms-of-service");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const onUpdate = async (payload) => {
    try {
      setBtnLoading(true);
      const response = await patchGDPRById(gdprId, {
        ...payload,
        status: enabled,
      });
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      toast.success(response?.message);
      setBtnLoading(false);
      navigate("/tenant/settings/custom-terms-of-service", {
        state: JSON.parse(localStorage.getItem("TOSFilter")),
      });
    } catch (error) {
      setBtnLoading(false);
      toast.error(error?.message || "Something went wrong");
    }
  };
  const handelToggleConfirmation = async (status) => {
    if (status) {
      setOpenToggleModal(true);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col mb-6">
        <InvolvCustomBreadCrumb
          heading={"Custom Terms of Service"}
          breadcrumbs={customBreadCrumb}
        />
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white py-6 px-6 text-gray-800 h-4/5">
        <form className="w-full">
          <h2 className="text-lg font-medium">Custom Terms of Service</h2>
          <div className="flex">
            <div className="w-4/5 mt-5">
              <div className="w-full relative">
                <input
                  type="text"
                  id="title"
                  className="h-10 w-full border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2 "
                  name="title"
                  placeholder="Title/Subject"
                  onBlur={formik.handleBlur}
                  value={formik.values?.title}
                  onChange={formik.handleChange}
                />
                {formik.errors?.title && formik.touched?.title && (
                  <span className="text-red-500 text-xs absolute -bottom-5 left-1.5 w-full">
                    {formik.errors.title}
                  </span>
                )}
              </div>
              <div className="w-full relative mt-10">
                <CKEditor
                  id="content"
                  name="content"
                  className="inputText"
                  editor={ClassicEditor}
                  config={{
                    extraPlugins: [uploadPlugin],
                    mediaEmbed: { previewsInData: true },
                  }}
                  data={formik.values?.content}
                  value={formik.values?.content}
                  onChange={(event, editor) => {
                    formik.setFieldValue("content", editor.getData());
                    formik.setFieldValue(
                      "rawContent",
                      new DOMParser().parseFromString(
                        editor.getData(),
                        "text/html"
                      ).documentElement.textContent
                    );
                  }}
                />

                {formik.errors?.content && formik.touched?.content && (
                  <span className="text-red-500 text-xs absolute -bottom-5 left-1.5 w-full">
                    {formik.errors.content}
                  </span>
                )}
                {formik.errors?.rawContent && (
                  <span className="text-red-500 text-xs absolute -bottom-5 left-1.5 w-full">
                    {formik.errors.rawContent}
                  </span>
                )}
              </div>
            </div>

            <div className="w-1/5 justify-center relative flex mt-6">
              <InvolvSwitchButton
                visible={true}
                enabled={enabled}
                setEnabled={(e) => {
                  setEnabled(!enabled);
                  handelToggleConfirmation(e);
                }}
              />
              <span className="ml-2 font-medium">Status</span>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full flex justify-end mt-3 items-center gap-4">
        <button
          onClick={() =>
            navigate("/tenant/settings/custom-terms-of-service", {
              state: JSON.parse(localStorage.getItem("TOSFilter")),
            })
          }
          className="text-gray-400"
        >
          Cancel
        </button>
        <InvolvButton
          type="submit"
          onClick={formik.handleSubmit}
          loading={btnLoading}
          disabled={btnLoading}
        >
          {gdprId ? "Update" : "Save"}
        </InvolvButton>
      </div>

      <div>
        {openToggleModal && (
          <InvolvTenantModal
            modalTitle="Confirmation"
            theme="indigo-900"
            modelIcon={<InformationCircleIcon className="w-5 mr-1" />}
            submitDataModal={() => {
              setOpenToggleModal(!openToggleModal);
            }}
            openModal={openToggleModal}
            handleModal={() => {
              setOpenToggleModal(!openToggleModal);
              setEnabled(false);
            }}
            buttonTitle="Yes"
          >
            <div className="sm:flex sm:items-start">
              This would deactivate the currently active TOS (if any). Are you
              sure you want to continue?
            </div>
          </InvolvTenantModal>
        )}
      </div>

      <div>
        {openModalUpdate && (
          <InvolvTenantModal
            modalTitle="Warning"
            theme="indigo-900"
            modelIcon={<InformationCircleIcon className="w-5 mr-1" />}
            submitDataModal={(e) => {
              onUpdate(beforeUpdateData);
            }}
            openModal={openModalUpdate}
            handleModal={() => setOpenModalUpdate(!openModalUpdate)}
            buttonTitle="Yes"
          >
            <div className="sm:flex sm:items-start">
              This would be saved as a new TOS. Are you sure you want to
              continue?
            </div>
          </InvolvTenantModal>
        )}
      </div>
    </>
  );
};
export default InvolvTosForm;
