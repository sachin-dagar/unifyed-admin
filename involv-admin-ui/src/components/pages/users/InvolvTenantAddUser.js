import React, { useEffect, useRef, useState } from "react";
import InvolvTenantModal from "../../shared/InvolvTenantModal";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/outline";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { UserService } from "../../../services/api/users/UsersService";
import { apiProvider } from "../../../services/api/utilities/provider";
import _ from "lodash";
import toast from "react-hot-toast";
import { ExportIcon } from "../../../AppIcons";
import { useLocation } from "react-router";

function InvolvTenantAddUser({
  isAddUserModalVisible,
  handleAddUserModal,
  handleFilter,
  filterAction,
  showTable,
  setShowTable,
  allRoles,
  refreshAllRolesList,
}) {
  const [role, setRole] = useState([]);
  const [gender, setGender] = useState([
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Other",
      label: "Other",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFileVerifyed, setIsFileVerifyed] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFileSize, setSelectedFileSize] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [fileUploadedData, setFileUploadedData] = useState(null);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const location = useLocation();

  const tableRef = useRef(null);
  const selectFileRef = useRef(null);
  const formRef = useRef();
  const handleSubmit = () => {
    if (fileUploadedData && fileUploadedData.result) {
      uploadFiles(uploadedFile);
    } else {
      if (formRef.current) {
        formRef.current.handleSubmit();
      }
    }
  };

  const checkUserIdAvailibity = (value) => {
    if (value) {
      try {
        return UserService.isUserIdAvailableEndUser(value).then((response) => {
          if (!response?.useridavailable) {
            return "User is Already Exist";
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const debouncedCheckUserIdAvailibity = _.debounce(checkUserIdAvailibity, 750);

  const AddUserSchema = Yup.object().shape({
    userFromData: Yup.array()
      .of(
        Yup.object().shape({
          userId: Yup.string().required("User Id is Required"),
          // .test("userIdUnique", "User is Already Exist", (value) =>
          //   debouncedCheckUserIdAvailibity(value)
          // ),
          firstName: Yup.string().required("First Name is Required"),
          lastName: Yup.string().required("Last Name is Required"),
          email: Yup.string()
            .required("Email Id is required")
            .email("Invalid email address format"),
          role: Yup.array().min(1, "Role is Required"),
        })
      )
      .required("Required"),
  });

  useEffect(() => {
    const roleOptions = [];
    allRoles
      ?.filter((item) => item?.role !== "Select all")
      .map((item) => roleOptions.push({ value: item.role, label: item.role }));
    setRole(roleOptions);
  }, [allRoles]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: 34,
      minHeight: 34,
      display: "flex",
      flexWrap: "no-wrap",
      fontSize: "0.75rem",
      borderColor: "rgba(209, 213, 219, 0.9)",
      borderRadius: "0.375rem",
      padding: 0,
      margin: 0,
      // border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        //  border: state.isFocused ? 0 : 0
        boxShadow: state.isFocused ? 0 : 0,
      },
    }),
    option: (base) => ({
      ...base,
      fontSize: "0.75rem",
    }),
    valueContainer: (base, state) => ({
      ...base,
      flexWrap: "no-wrap !important",
      boxShadow: state.isFocused ? 0 : 0,
    }),
  };

  const uploadFilesVerify = async (file) => {
    setLoaderBtn(true);
    let formData = new FormData();
    formData.append("file", file);
    try {
      const response = await apiProvider.post(
        "api/user/uploadendusers/verify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            const count = Math.round((100 * data.loaded) / data.total);
            setProgressCount(count);
          },
        }
      );
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      setFileUploadedData(response);
      setIsFileVerifyed(true);
      setShowTable(true);
      tableRef.current.scrollIntoView({ behavior: "smooth" });
      setIsUploaded(true);
      setLoaderBtn(false);
      toast.success("Template Verifyed");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setIsFileVerifyed(false);
      setUploadedFile(null);
      setLoaderBtn(false);
    }
  };

  const uploadFiles = async (file) => {
    setLoaderBtn(true);
    setUploadedFile(null);
    let formData = new FormData();
    formData.append("file", file);
    try {
      const response = await apiProvider.post(
        "api/user/uploadendusers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            const count = Math.round((100 * data.loaded) / data.total);
            setProgressCount(count);
          },
        }
      );
      if (response?.data?.errorMessage) {
        throw new Error(response?.data?.errorMessage || "Something went wrong");
      }
      if (response?.result?.rejectedUsers?.length === 0) {
        handleFilter({ ...filterAction });
        setShowTable(false);
        setIsUploaded(false);
        setLoaderBtn(false);
        setIsFileVerifyed(false);
        setRejectedUsers([]);
        setUploadedFile(null);
        setSelectedFile("");
        setProgressCount(0);
        setSelectedFileSize(null);
        setFileUploadedData(null);
        refreshAllRolesList(); // for refreshing the list of allRoles filter
        toast.success("Template uploaded");
        handleAddUserModal();
      } else {
        setLoaderBtn(false);
        setRejectedUsers([...response?.result?.rejectedUsers]);
        setFileUploadedData((prevState) => {
          const state = { ...prevState };
          state.result.usersValid = response?.result?.usersAdded;
          state.result.usersInvalid = response?.result?.usersRejected;
          return state;
        });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setUploadedFile(null);
      setIsFileVerifyed(false);
      setLoaderBtn(false);
    }
  };

  const selectFile = (e) => {
    setRejectedUsers([]);
    setIsUploaded(false);
    setFileUploadedData(null);
    setUploadedFile(null);
    setSelectedFile(null);
    setIsFileVerifyed(false);
    setShowTable(false);
    setUploadedFile(e.target.files[0]);
    setSelectedFile(e.target.files[0].name);
    setProgressCount(0);
    let _size = e.target.files[0].size;
    let fSExt = new Array("Bytes", "KB", "MB", "GB"),
      i = 0;
    while (_size > 900) {
      _size /= 1024;
      i++;
    }
    let exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
    setSelectedFileSize(exactSize);
    e.target.value = null;
    return selectFileRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const deleteUploadedFile = () => {
    setRejectedUsers([]);
    setIsUploaded(false);
    setIsFileVerifyed(false);
    setProgressCount(0);
    setFileUploadedData(null);
    setShowTable(false);
    setUploadedFile(null);
    setSelectedFile(null);
  };

  return (
    <InvolvTenantModal
      openModal={isAddUserModalVisible}
      modalTitle="Add User(s)"
      loaderBtn={loaderBtn}
      handleOutsideClick={() => {}}
      isBtnDisable={isUploaded}
      btnDisable={
        (isFileVerifyed && fileUploadedData?.result?.usersValid === 0) ||
        rejectedUsers.length
      }
      buttonTitle={selectedFile ? "Verify" : "Submit"}
      handleModal={() => {
        handleAddUserModal();
        deleteUploadedFile();
      }}
      submitDataModal={() => {
        if (selectedFile && !isFileVerifyed) {
          uploadFilesVerify(uploadedFile);
        } else {
          handleSubmit();
        }
      }}
      width="xl"
    >
      <Formik
        initialValues={{
          userFromData: [
            {
              userId: "",
              firstName: "",
              lastName: "",
              email: "",
              role: [],
              gender: "",
            },
          ],
        }}
        validationSchema={AddUserSchema}
        innerRef={formRef}
        onSubmit={async (values) => {
          setLoaderBtn(true);
          const valueFormatted = [];
          values?.userFromData?.map((el) =>
            valueFormatted.push({
              userId: el.userId,
              firstName: el.firstName,
              lastName: el.lastName,
              email: [el.email],
              roles: el.role,
              bio: {
                gender: el.gender,
              },
              contact: {
                primaryEmail: el.email,
              },
            })
          );
          try {
            const response = await UserService.createEndUser(valueFormatted);
            console.log("RESPONSE", response);

            if (response?.usersRejected > 0) {
              response?.rejectedUsers.map((res) => {
                toast.error(res?.reason || "Something went wrong");
              });
            }

            if (response?.usersAdded > 0) {
              // setUsersData(response);
              // setIsLoading(false);
              refreshAllRolesList(); // for refreshing the list of allRoles filter
              toast.success("User added successfully");
            }
            handleFilter(filterAction);
            handleAddUserModal();
            setLoaderBtn(false);
          } catch (error) {
            toast.error(error.message || "Something went wrong");
            setLoaderBtn(false);
          }
        }}
      >
        {({ values }) => (
          <div>
            <form onSubmit={!selectedFile ? handleSubmit : () => {}}>
              <div>
                <FieldArray
                  name="userFromData"
                  render={(arrayHelpers) => (
                    <>
                      {values?.userFromData?.map((item, index) => (
                        <div
                          className={
                            index != values?.userFromData?.length - 1
                              ? "border-gray-400 border-b mb-5"
                              : null
                          }
                          key={index}
                        >
                          {values?.userFromData?.length > 1 && (
                            <div className="flex mb-1">
                              <div className="pr-2 w-2/4" />
                              <div className="pr-2 w-2/4">
                                <button
                                  type="button"
                                  className="flex justify-end w-full cursor-default"
                                >
                                  <span
                                    className="flex text-red-500 text-sm items-center text-sm cursor-pointer"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <TrashIcon className="h-4 w-4" /> Remove
                                  </span>
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="flex mb-4">
                            <div className="pr-2 w-2/4">
                              <Field
                                type="text"
                                name={`userFromData.${index}.userId`}
                                placeholder="Enter User Id"
                                onBlur={() => {
                                  return;
                                }}
                                autoComplete="off"
                                className={
                                  "max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-xs border-gray-300 rounded-md"
                                }
                                validate={debouncedCheckUserIdAvailibity}
                              />
                              <ErrorMessage
                                component="div"
                                name={`userFromData.${index}.userId`}
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="pr-2 w-2/4">
                              <Field
                                type="text"
                                name={`userFromData.${index}.firstName`}
                                placeholder="Enter First Name"
                                onBlur={() => {
                                  return;
                                }}
                                autoComplete="off"
                                className="max-w-lg block w-full  sm:max-w-xs sm:text-xs border-gray-300 rounded-md shadow-none outline-0 focus:outline-0 focus:shadow-none focus: border-gray-300"
                              />

                              <ErrorMessage
                                component="div"
                                name={`userFromData.${index}.firstName`}
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex mb-4">
                            <div className="pr-2 w-2/4">
                              <Field
                                type="text"
                                name={`userFromData.${index}.lastName`}
                                placeholder="Enter Last Name"
                                onBlur={() => {
                                  return;
                                }}
                                autoComplete="off"
                                className={
                                  "max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-xs border-gray-300 rounded-md"
                                }
                              />

                              <ErrorMessage
                                component="div"
                                name={`userFromData.${index}.lastName`}
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="pr-2 w-2/4">
                              <Field
                                type="email"
                                name={`userFromData.${index}.email`}
                                placeholder="Enter Email ID"
                                onBlur={() => {
                                  return;
                                }}
                                autoComplete="off"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-xs border-gray-300 rounded-md"
                              />

                              <ErrorMessage
                                component="div"
                                name={`userFromData.${index}.email`}
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex mb-8">
                            <div className="pr-2 w-2/4">
                              <Field name={`userFromData.${index}.gender`}>
                                {({ field, form }) => (
                                  <Select
                                    placeholder="Select Gender"
                                    classNamePrefix="gadget-role"
                                    onBlur={() => {
                                      return;
                                    }}
                                    className="gadget-role__input"
                                    options={gender}
                                    isMulti={false}
                                    onChange={(selectedOption) =>
                                      form.setFieldValue(
                                        `userFromData.${index}.gender`,
                                        selectedOption.value
                                      )
                                    }
                                    styles={customStyles}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                component="div"
                                name={`userFromData.${index}.role`}
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="pr-2 w-2/4">
                              <Field name={`userFromData.${index}.role`}>
                                {({ field, form }) => (
                                  <CreatableSelect
                                    placeholder="Select Role"
                                    classNamePrefix="gadget-role"
                                    onBlur={() => {
                                      return;
                                    }}
                                    className="gadget-role__input"
                                    options={role}
                                    isMulti
                                    onChange={(selectedOption) =>
                                      form.setFieldValue(
                                        `userFromData.${index}.role`,
                                        selectedOption.map((item) => item.value)
                                      )
                                    }
                                    styles={customStyles}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                component="div"
                                name={`userFromData.${index}.role`}
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="flex justify-end w-full pr-2 cursor-default"
                      >
                        <span
                          className="flex text-blue-700 text-sm items-center cursor-pointer"
                          onClick={() =>
                            arrayHelpers.push({
                              userId: "",
                              firstName: "",
                              lastName: "",
                              email: "",
                              role: [],
                            })
                          }
                        >
                          <PlusCircleIcon className="h-6 w-6" /> Add More
                        </span>
                      </button>
                    </>
                  )}
                />
              </div>
            </form>
          </div>
        )}
      </Formik>

      <div className="flex text-center items-center">
        <div className="w-full h-px bg-gray-300"></div>
        <span className="border rounded-full p-2 text-xs w-8 h-8">or</span>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
      <div className="mb-0 font-medium text-sm mt-4">Import Multiple Users</div>
      <div className="flex space-x-4 mt-5">
        <a
          className="shadow-lg h-11 flex items-center px-4 py-2 border border-indigo-900 text-indigo-900 text-xs leading-tight rounded hover:bg-gray-100  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          href="/images/EndUsersTemplate.xlsx"
          download
        >
          <span className="transform-180">
            <ExportIcon width="w-4" height="h-4" />
          </span>
          <span className="ml-2">Download Template</span>
        </a>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="primaryBtn text-xs rounded h-11"
          >
            <ExportIcon width="w-4" height="h-4" />

            <span className="ml-2">Upload Template</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept={
                ".csv, .application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx, .xls"
              }
              className="sr-only"
              onChange={(e) => selectFile(e)}
            />
          </label>
        </div>
      </div>

      {selectedFile && (
        <div ref={tableRef}>
          <div className="border  mt-4 ">
            <div className="flex justify-between p-3">
              <div className="flex items-center" ref={selectFileRef}>
                {uploadedFile?.type === "text/csv" ? (
                  <img src="/images/csv-icon.png" className="w-10 h-10 mr-5" />
                ) : (
                  <img src="/images/excel.svg" className="w-12 h-12 mr-5" />
                )}

                <div>
                  <p className="font-medium text-sm">{selectedFile}</p>
                  <p className="font-medium text-xs text-gray-400">
                    {selectedFileSize}
                  </p>
                </div>
              </div>
              <TrashIcon
                className="h-5 w-5 text-gray-400 cursor-pointer"
                onClick={deleteUploadedFile}
              />
            </div>
            {fileUploadedData?.result?.usersInvalid > 0 ? (
              <div className={"w-full h-1 bg-red-500 "}></div>
            ) : fileUploadedData?.result?.usersInvalid === 0 &&
              fileUploadedData?.result?.usersValid > 0 ? (
              <div
                className={" h-1 bg-green-500 "}
                style={{ width: `${progressCount}` + "%" }}
              ></div>
            ) : (
              <div
                className={" h-1 bg-blue-500 "}
                style={{ width: `${progressCount}` + "%" }}
              ></div>
            )}
          </div>
          {showTable && (
            <div className="flex justify-center align-center mt-4 flex-col gap-4">
              <table className="divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium">
                      Valid
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium">
                      Invalid
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4  text-center text-gray-500 text-xs font-medium">
                      {fileUploadedData?.result?.usersValid +
                        fileUploadedData?.result?.usersInvalid || 0}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 text-xs font-medium">
                      {fileUploadedData?.result?.usersValid || 0}
                    </td>
                    <td className="px-6 py-4  text-center text-red-500 text-xs font-medium">
                      {fileUploadedData?.result?.usersInvalid || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              {rejectedUsers.length ? (
                <div className="flex flex-col pr-4 pb-4">
                  <div className="mb-4"> Following Error Happened </div>

                  {rejectedUsers.map((user) => (
                    <div className="flex justify-start gap-4 mb-2">
                      <div className="text-red-600 border-r-4 w-48">
                        {user.userId}
                      </div>
                      <div className="text-red-600 border-b-2 pl-4 pb-4">
                        {user.reason}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </InvolvTenantModal>
  );
}

export default InvolvTenantAddUser;
