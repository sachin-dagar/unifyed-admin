import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon } from "@heroicons/react/outline";
import MultiPageField from "./MultiPageField";

const NestedPageForm = ({
  data,
  values,
  setFieldValue,
  setPermission,
  errors,
}) => {
  const [multiFields, setMultiFields] = useState({});
  const [fields, setFields] = useState({});
  useEffect(() => {
    const newData = [];
    data.forEach((item) => {
      if (item?.key === "pagename") {
        newData[0] = {
          ...item,
          value: "",
        };
      }

      if (item?.key === "pagecolour") {
        newData[1] = {
          ...item,
          isShowPicker: false,
          value: "",
        };
      }

      if (item?.key === "pagecontent") {
        newData[2] = {
          ...item,
          value: "",
        };
      }
    });
    setFields(newData);
    if (values?.page) {
      const newMultiData = {};
      values.page.map((value) => {
        const updatedMultirow = newData.map((item) => {
          if (item?.key === "pagecolour") {
            return {
              ...item,
              value: value[item?.key],
              isPickerShow: false,
            };
          }
          return {
            ...item,
            value: value[item?.key],
          };
        });
        newMultiData[uuidv4()] = updatedMultirow;
      });
      setMultiFields(newMultiData);
    } else {
      setMultiFields({ [uuidv4()]: newData });
    }
  }, [data]);

  const handleAddMore = () => {
    const newMultiField = { ...multiFields };
    newMultiField[uuidv4()] = fields;
    setMultiFields(newMultiField);
  };

  const handleRemove = useCallback((id) => {
    const newMultiField = { ...multiFields };
    delete newMultiField[id];
    const pageData = Object.values(newMultiField).map((rows) => {
      let tempData = {};
      rows.map((row) => {
        tempData[row.key] = row?.value;
      });
      return tempData;
    });
    setFieldValue("page", pageData);
    setMultiFields(newMultiField);
  });

  const handleChange = (id, payload) => {
    const newFieldValues = multiFields[id].map((item) => {
      if (item?.key === "pagecolour" && payload?.key === "isPickerShow") {
        return {
          ...item,
          isPickerShow: payload?.value,
        };
      }
      if (item?.key === payload.key) {
        return {
          ...item,
          value: payload.value,
        };
      }
      return item;
    });

    const newMultiField = { ...multiFields, [id]: newFieldValues };
    const pageData = Object.values(newMultiField).map((rows) => {
      let tempData = {};
      rows.map((row) => {
        tempData[row.key] = row?.value;
      });
      return tempData;
    });
    setMultiFields(newMultiField);
    setFieldValue("page", pageData);
    setPermission();
  };

  return (
    <>
      {Object.entries(multiFields).map(([key, value], index) => (
        <>
          {value.map((item) => (
            <MultiPageField
              item={item}
              id={key}
              index={index}
              errors={errors}
              handleChange={handleChange}
            />
          ))}
          {fields.length % 2 === 1 ? <></> : <div />}
          <div className="w-full flex items-start justify-end">
            {index === 0 && Object.keys(multiFields).length <= 9 ? (
              <span
                onClick={handleAddMore}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 bg-indigo-900 rounded cursor-pointer"
              >
                <PlusIcon className="w-6 h-6 text-white" />
              </span>
            ) : (
              <span
                onClick={() => handleRemove(key)}
                className="w-12 h-12 flex items-center justify-center border-none rounded cursor-pointer"
              >
                <PlusIcon className="w-8 h-8 rotate-45 text-red-500" />
              </span>
            )}
          </div>
        </>
      ))}
    </>
  );
};

export default NestedPageForm;
