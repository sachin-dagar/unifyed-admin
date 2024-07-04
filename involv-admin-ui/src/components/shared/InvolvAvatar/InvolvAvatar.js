import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { useFormikContext } from "formik";
import { apiProvider } from "../../../services/api/utilities/provider";
import toast from "react-hot-toast";
import { cameraIcon } from "../../../AppIcons";

const InvolvAvatar = ({
  imageUrl,
  showCamera = false,
  onChange,
  customClass = "",
  name,
  ...rest
}) => {
  const acceptedImages = "image/png, image/jpeg";

  const [imageUrlNew, setImageUrlNew] = useState(null);

  return (
    <span className="inline-block relative w-[148px] h-[148px]">
      {/* "/images/default-org-icon.svg" */}
      {imageUrlNew || imageUrl ? (
        <img
          className={
            "rounded-full object-cover h-full w-full border" + customClass
          }
          src={imageUrlNew || imageUrl}
          alt=""
          {...rest}
        />
      ) : (
        <div
          className={
            "rounded-full h-full w-full border flex items-center justify-center bg-grayInvolv-300" +
            customClass
          }
        >
          <img
            className="w-14 h-14"
            src="/images/default-org-icon.svg"
            alt=""
            {...rest}
          />
        </div>
      )}
      {showCamera && (
        <div>
          <span
            className={
              "w-8 h-8 shadow-lg bottom-6 right-4 p-1 flex items-center justify-center border-2 border-white rounded-full bg-white absolute transform translate-y-1/2 translate-x-1/2 text-indigo-1200"
            }
          >
            <label htmlFor={name}>{cameraIcon}</label>
            <input
              id={name}
              accept={acceptedImages}
              name={name}
              type="file"
              hidden
              onChange={onChange}
              className="form-control"
            />
          </span>
        </div>
      )}
    </span>
  );
};

export default InvolvAvatar;
