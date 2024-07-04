import React from "react";
import FloatingLabelInput from "../../FloatingLabelInput";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import OutsideClickHandler from "react-outside-click-handler";

import { SketchPicker } from "react-color";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DocumentTextIc } from "../../../../AppIcons";

const MultiLinkField = ({ item, id, index, handleChange, errors }) => {
  if (item?.key === "linkname") {
    if (!item?.showByDefault) {
      return;
    }
    let showRow = true;

    if (item?.showWhen) {
      showRow = item?.showWhen[0] === values[item?.dependentField];
    }

    if (!showRow) {
      return;
    }

    return (
      <div className="relative mt-3" key={id}>
        <FloatingLabelInput
          maxLength={30}
          type="text"
          name={`link[${index}].linkname`}
          placeholder={item?.attributeName || item?.displayName}
          autoComplete="off"
          value={item.value}
          onChange={(e) => {
            handleChange(id, { key: item?.key, value: e.target.value });
          }}
        />
        {errors.link && errors.link[index] && errors?.link[index].linkname && (
          <div className="text-red-500 text-xs my-2 ml-1 absolute -bottom-6">
            {errors?.link[index].linkname}
          </div>
        )}
      </div>
    );
  } else if (item?.key === "linkcolour") {
    if (!item?.showByDefault) {
      return;
    }
    let showRow = true;

    if (item?.showWhen) {
      showRow = item?.showWhen[0] === values[item?.dependentField];
    }

    if (!showRow) {
      return;
    }

    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          handleChange(id, {
            key: "isPickerShow",
            value: false,
          });
        }}
      >
        <div className="flex justify-between items-center mt-3" key={id}>
          <span
            className="p-2 px-3 border border-gray-300 rounded"
            style={{ color: item?.value || "#444" }}
          >
            <DocumentTextIc />
          </span>

          <div
            className="flex items-center justify-between relative bg-white w-400 py-2.5 px-3 border border-gray-200 rounded h-12 cursor-pointer"
            onClick={() =>
              handleChange(id, {
                key: "isPickerShow",
                value: !item?.isPickerShow,
              })
            }
          >
            <div className="flex items-center">
              <div
                style={{
                  backgroundColor: item?.value || "#444",
                }}
                className={`w-7 h-7 rounded-full`}
              ></div>
              <div className="text-grayInvolv-900 ml-2 text-xl2">
                Choose theme color
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              {item?.isPickerShow ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
              {item?.isPickerShow && (
                <SketchPicker
                  className="absolute top-14 right-0 w-263 z-20"
                  color={item?.value || "#444"}
                  onChange={(updateColor) => {
                    handleChange(id, {
                      key: item?.key,
                      value: updateColor.hex,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  } else if (item?.key === "linkurl") {
    return (
      <div className="relative mt-3" key={id}>
        <FloatingLabelInput
          type="text"
          name={`link[${index}].linkurl`}
          placeholder={item?.attributeName || item?.displayName}
          autoComplete="off"
          value={item.value}
          onChange={(e) => {
            handleChange(id, { key: item?.key, value: e.target.value });
          }}
        />
        {errors.link && errors.link[index] && errors?.link[index].linkurl && (
          <div className="text-red-500 text-xs my-2 ml-1 absolute -bottom-6">
            {errors?.link[index].linkurl}
          </div>
        )}
      </div>
    );
  }
};

export default MultiLinkField;
