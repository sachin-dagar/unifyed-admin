import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import Select from "react-select";
import * as Yup from "yup";
import FloatingLabelInput from "../FloatingLabelInput";
import NestedPageForm from "./Page/NestedPageForm";
import NestedLinkForm from "./Link/NestedLinkForm";

const DynamicForm = ({
  gadgetAttributeMap,
  values,
  errors,
  defaultValue,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <>
      {gadgetAttributeMap?.map((item, index) => {
        if (item?.type === "text") {
          // Text
          // Checkbox
          if (!item?.showByDefault) {
            return;
          }
          let showField = true;

          if (item?.showWhen) {
            showField = item?.showWhen[0] === values[item?.dependentField];
          }

          if (!showField) {
            return;
          }

          return (
            <div key={index} className="relative">
              <FloatingLabelInput
                type="text"
                name={item?.key}
                placeholder={item?.attributeName || item?.displayName}
                autoComplete="off"
                onChange={handleChange}
              />
              {errors?.[item?.key] && (
                <div className="text-red-500 text-xs mt-1 ml-1 absolute -bottom-4.5">
                  {errors?.[item?.key]}
                </div>
              )}
            </div>
          );
        } else if (item?.type === "dropdown" || item?.type === "multiSelect") {
          const options = item?.staticValues?.map((item) => ({
            label: item?.value,
            value: item?.key,
          }));

          const selectValue = !isEmpty(values?.[item?.key])
            ? item?.attributeType === "multiSelect"
              ? values?.[item?.key]?.map((selectOptionVal) => {
                  return {
                    label: selectOptionVal,
                    value: selectOptionVal,
                  };
                })
              : {
                  label: options.find(
                    (option) => option?.value === values?.[item?.key]
                  )?.label,
                  value: values?.[item?.key],
                }
            : null;

          const defaultVal =
            (!isEmpty(defaultValue?.[item?.key]) &&
              (item?.attributeType === "multiSelect"
                ? defaultValue?.[item?.key]?.map((selectOptionVal) => ({
                    label: selectOptionVal,
                    value: selectOptionVal,
                  }))
                : {
                    label: defaultValue?.[item?.key],
                    value: defaultValue?.[item?.key],
                  })) ||
            null;

          // Checkbox
          if (!item?.showByDefault) {
            return;
          }
          let showField = true;

          if (item?.showWhen) {
            showField = item?.showWhen[0] === values[item?.dependentField];
          }

          if (!showField) {
            return;
          }

          return (
            <div key={index} className="relative">
              <Select
                isClearable
                name={item?.key}
                id={item?.key}
                options={options}
                type="select"
                classNamePrefix="dynamic-form h-full"
                className=" dynamic-form__input h-full"
                placeholder=""
                isMulti={item?.attributeType === "multiSelect"}
                onChange={(res) => {
                  const value =
                    (!isEmpty(res) &&
                      (item?.attributeType === "multiSelect"
                        ? res?.map((subItem) => subItem.value)
                        : res.value)) ||
                    "";
                  setFieldValue(item?.key, value);

                  gadgetAttributeMap.map((field) => {
                    if (
                      field?.dependentField === item?.key &&
                      field?.showWhen[0] !== value
                    ) {
                      if (
                        field?.type === "multiSelect" ||
                        field?.type === "dropdown"
                      ) {
                        setFieldValue(field?.key, "");
                      }
                    }
                  });
                }}
                onBlur={handleBlur}
                value={selectValue}
                defaultValue={defaultVal}
              />
              <label
                className={[
                  "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
                  selectValue
                    ? "text-xs px-2 -top-1 left-2 bg-white"
                    : "text-sm p-2 top-0.5 left-0",
                ].join(" ")}
                htmlFor={item?.key}
              >
                {item?.displayName}
              </label>
              {errors?.[item?.key] && (
                <div className="text-red-500 text-xs mt-1 ml-1 absolute -bottom-8">
                  {errors?.[item?.key]}
                </div>
              )}
            </div>
          );
        } else if (item.type === "checkbox") {
          const isChecked =
            (!isEmpty(values?.[item?.key]) && values?.[item?.key]) || false;

          // Checkbox
          if (!item?.showByDefault) {
            return;
          }
          let showField = true;

          if (item?.showWhen) {
            showField = item?.showWhen[0] === values[item?.dependentField];
          }

          if (!showField) {
            return;
          }

          return (
            <div className="relative">
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name={item?.id}
                  onChange={(res) =>
                    setFieldValue(
                      item?.key,
                      (!isEmpty(res) && res.value) || false
                    )
                  }
                  value={isChecked}
                />
                {item?.displayName}
              </label>
              {errors?.[item?.key] && (
                <div className="text-red-500 text-xs mt-1 ml-1 absolute bottom-0">
                  {errors?.[item?.key]}
                </div>
              )}
            </div>
          );
        } else if (item.type === "textarea") {
          // TextArea
          if (!item?.showByDefault) {
            return;
          }
          let showField = true;

          if (item?.showWhen) {
            showField = item?.showWhen[0] === values[item?.dependentField];
          }

          if (!showField) {
            return;
          }

          return (
            <div className="relative">
              <textarea
                placeholder={item?.attributeName || item?.displayName}
                onChange={(event) =>
                  setFieldValue(item?.key, event.target.value)
                }
                autoComplete="off"
                rows={6}
                className="border-gray-300 rounded w-full text-sm h-14"
                value={values?.[item?.key]}
              ></textarea>
              {errors?.[item?.key] && (
                <div className="text-red-500 text-xs mt-1 ml-1 absolute bottom-0">
                  {errors?.[item?.key]}
                </div>
              )}
            </div>
          );
        } else if (item.type === "multirow" && item.key === "page") {
          if (!item?.showByDefault) {
            return;
          }
          let showField = true;

          if (item?.showWhen) {
            showField = item?.showWhen[0] === values[item?.dependentField];
          }

          if (!showField) {
            return;
          }

          const setPermission = () => {
            if (item?.isPermisssionEnable)
              return setFieldValue(
                "isPermisssionEnable",
                item?.isPermisssionEnable
              );
            return;
          };

          return (
            <NestedPageForm
              setPermission={setPermission}
              data={item?.nestedAttribute}
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          );
        } else if (item.type === "multirow" && item.key === "link") {
          if (!item?.showByDefault) {
            return;
          }
          let showField = true;

          if (item?.showWhen) {
            showField = item?.showWhen[0] === values[item?.dependentField];
          }

          if (!showField) {
            return;
          }

          const setPermission = () => {
            if (item?.isPermisssionEnable)
              return setFieldValue(
                "isPermisssionEnable",
                item?.isPermisssionEnable
              );
            return;
          };

          return (
            <NestedLinkForm
              setPermission={setPermission}
              data={item?.nestedAttribute}
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          );
        }
      })}
    </>
  );
};

const getDynamicFormConfig = (gadgetAttributeMap) => {
  const ConfigSchema = {};
  const InitialValue = {};

  gadgetAttributeMap?.forEach((item) => {
    InitialValue[item?.key] = "";
    if (
      !isEmpty(item?.attributeValue) ||
      (!isEmpty(item?.defaultValue) && item?.defaultValue !== "--select one--")
    ) {
      InitialValue[item?.key] = item?.attributeValue || item?.defaultValue;
    }
    if (
      item?.isRequired &&
      item?.type !== "multirow" &&
      item?.type === "link"
    ) {
      if (item?.dependentField) {
        ConfigSchema[item?.key] = Yup.string().when(item?.dependentField, {
          is: (value) => value === item?.requiredWhen[0],
          then: Yup.string().required(`${item?.displayName} is required`),
        });
      } else {
        ConfigSchema[item?.key] = Yup.string().required(
          `${item?.displayName} is required`
        );
      }
    } else if (item?.isRequired) {
      if (item?.key === "page") {
        ConfigSchema[item?.key] = Yup.array()
          .max(10)
          .of(
            Yup.object({
              pagename: Yup.string().required("Page name is required"),
              pagecontent: Yup.string().required("Page content is required"),
            })
          );
      }
      if (item?.key === "link") {
        ConfigSchema[item?.key] = Yup.array()
          .max(10)
          .of(
            Yup.object({
              linkname: Yup.string().required("Link name is required"),
              linkurl: Yup.string().url().required("Link url is required"),
            })
          );
      }
    }
  });

  return {
    ConfigSchema,
    InitialValue,
  };
};

export { getDynamicFormConfig };

export default DynamicForm;
