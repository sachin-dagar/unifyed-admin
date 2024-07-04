import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import InvolvTenantModal from "../InvolvTenantModal";
import { getCroppedImgBlob } from "../../../util";
import toast from "react-hot-toast";
import { ZoomInIcon, ZoomOutIcon } from "@heroicons/react/outline";

export const InvolvTenantImageCrop = ({
  defaultImage,
  isOpenUploadModal,
  closeUploadModal,
  saveBtnLoader,
  handleSave,
  setDefaultImage,
}) => {
  const [cropper, setCropper] = useState(null);
  const [isZoom, setIsZoom] = useState(true);
  const logoUploadRef = useRef(null);
  const [zoom, setZoom] = useState(0);

  const beforeUploadLogo = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG/SVG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleZoomAction = (action) => {
    if (action === "-" && zoom >= 0) setZoom(zoom - 0.1);
    if (action === "+" && zoom < 3) setZoom(zoom + 0.1);
  };

  const handleZoom = (e) => {
    setZoom(parseFloat(e?.target?.value));
  };

  const onChange = (e) => {
    e.preventDefault();
    if (beforeUploadLogo(e.target.files[0])) {
      const files = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setDefaultImage(reader.result);
      };
      reader.readAsDataURL(files);
    }
  };

  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      try {
        const blob = await getCroppedImgBlob(cropper.getCroppedCanvas());
        handleSave(blob);
        setDefaultImage(cropper.getCroppedCanvas().toDataURL());
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <InvolvTenantModal
      openModal={isOpenUploadModal}
      handleModal={closeUploadModal}
      modalTitle={"Upload Image"}
      btnDisable={!defaultImage}
      handleOutsideClick={() => {}}
      buttonTitle={"Apply"}
      loaderBtn={saveBtnLoader}
      submitDataModal={getCropData}
      width={"full lg:w-6/12"}
      height={"max-h-max"}
    >
      <div style={{ width: "100%" }}>
        <Cropper
          style={{ maxHeight: 300, width: "100%" }}
          zoomTo={zoom}
          zoomOnTouch={false}
          zoomOnWheel={false}
          initialAspectRatio={1}
          preview=".img-preview"
          src={defaultImage}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex justify-center items-center gap-3">
            <label
              onClick={() => logoUploadRef.current.click()}
              className="flex justify-start items-center rounded space-x-2 text-blue-700  border border-indigo-900 focus:border-indigo-900 focus:outline-0 py-1 px-3"
            >
              Change Image
            </label>
            <input type="file" hidden onChange={onChange} ref={logoUploadRef} />
          </div>

          {isZoom && (
            <div className="flex justify-end py-3 gap-2 items-center">
              <ZoomOutIcon
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={() => handleZoomAction("-")}
              />
              <input
                type="range"
                className=" form-range w-40 h-4 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                min={0}
                step={0.1}
                max={3}
                value={zoom}
                onChange={(e) => handleZoom(e)}
              />
              <ZoomInIcon
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={() => handleZoomAction("+")}
              />
            </div>
          )}
        </div>
        <div className="suggestedBg1 font-semibold text-left">
          Suggested Dimensions :&nbsp;{" "}
          <span className="font-semibold text-gray-500">(168 x 48)px</span>
          <span style={{ color: "#6C7380", fontWeight: "300" }}>
            {" "}
            ( Max file size limit is 5mb )
          </span>
        </div>
      </div>
    </InvolvTenantModal>
  );
};

export default InvolvTenantImageCrop;
