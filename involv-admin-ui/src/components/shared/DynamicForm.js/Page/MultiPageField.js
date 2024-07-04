import React from "react";
import FloatingLabelInput from "../../FloatingLabelInput";
import OutsideClickHandler from "react-outside-click-handler";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import { SketchPicker } from "react-color";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Document } from "postcss";
import { DocumentTextIc } from "../../../../AppIcons";
import { apiProvider } from "../../../../services/api/utilities/provider";

const MultiPageField = ({ item, id, index, handleChange, errors }) => {
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

  if (item?.key === "pagename") {
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
          name={`page[${index}.pagename]`}
          placeholder={item?.attributeName || item?.displayName}
          autoComplete="off"
          value={item.value}
          onChange={(e) => {
            handleChange(id, { key: item?.key, value: e.target.value });
          }}
        />
        {errors.page && errors.page[index] && errors?.page[index].pagename && (
          <div className="text-red-500 text-xs my-2 ml-1 absolute -bottom-6">
            {errors?.page[index].pagename}
          </div>
        )}
      </div>
    );
  } else if (item?.key === "pagecolour") {
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
  } else if (item?.key === "pagecontent") {
    return (
      <div className="mt-3 relative">
        <CKEditor
          key={id}
          editor={ClassicEditor}
          name={`page[${index}.pagecontent]`}
          config={{
            extraPlugins: [uploadPlugin],
            mediaEmbed: { previewsInData: true },
          }}
          data={item?.value || ""}
          onChange={(event, editor) => {
            handleChange(id, {
              key: item?.key,
              value: editor.getData(),
            });
          }}
        />
        {errors.page &&
          errors.page[index] &&
          errors?.page[index].pagecontent && (
            <div className="text-red-500 text-xs my-2 ml-1 absolute -bottom-6">
              {errors?.page[index].pagecontent}
            </div>
          )}
      </div>
    );
  }
};

export default MultiPageField;
