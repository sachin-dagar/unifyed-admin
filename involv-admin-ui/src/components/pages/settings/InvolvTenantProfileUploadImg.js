import React, { useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cropper from "react-easy-crop";
import InvolvTenantModal from "../../shared/InvolvTenantModal";
import { ZoomInIcon, ZoomOutIcon } from "@heroicons/react/outline";
import { MdCloudUpload } from "react-icons/md";
import {
  getCroppedImg,
  getCroppedImgBlob,
  getCroppedImgDataURL,
} from "../../../util";

function InvolvTenantProfileUploadImg({
  isOpenUploadModal,
  closeUploadModal,
  profileImg,
  isZoom = true,
  imageType,
  setCroppedImage,
  chooseImage,
  handleSave,
  saveBtnLoader,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropImagePixels, setCropImagePixels] = useState({});

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropImagePixels(croppedAreaPixels);
  }, []);
  const handleZoom = (e) => {
    setZoom(parseFloat(e?.target?.value));
  };

  const handleZoomAction = (action) => {
    if (action === "-" && zoom > 1) setZoom(zoom - 0.1);
    if (action === "+" && zoom < 3) setZoom(zoom + 0.1);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(profileImg, cropImagePixels);
      const croppedImgDataUrl = await getCroppedImgDataURL(croppedImg);
      const croppedImgBlob = await getCroppedImgBlob(croppedImg);
      setZoom(1);
      setCroppedImage(croppedImgDataUrl);
      handleSave(croppedImgBlob);
    } catch (e) {
      console.error(e);
    }
  }, [cropImagePixels]);

  return (
    <React.Fragment>
      <InvolvTenantModal
        openModal={isOpenUploadModal}
        handleModal={closeUploadModal}
        modalTitle={"Upload Image"}
        btnDisable={!profileImg}
        handleOutsideClick={() => {}}
        buttonTitle={"Save"}
        loaderBtn={saveBtnLoader}
        submitDataModal={showCroppedImage}
        width={"full lg:w-6/12"}
        height={"max-h-max"}
      >
        <div className={`relative ${profileImg && "h-80"} w-full pt-12`}>
          <div className="crop-container">
            {profileImg && (
              <Cropper
                image={profileImg}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
        </div>
        {!profileImg && (
          <>
            <div className="actions flex h-64 w-full items-center justify-center">
              <div
                className="flex text-indigo-500 items-center gap-1 cursor-pointer p-32"
                onClick={chooseImage}
              >
                <MdCloudUpload
                  className="h-12 w-12"
                  //   style={{ color: themeColor }}
                />
                <p
                  className="text-lg capitalize font-medium"
                  //   style={{ color: themeColor }}
                >
                  {"Choose Image"}
                </p>
              </div>
            </div>
          </>
        )}
        <div container overflow="hidden" className="slider mt-5">
          <div className="flex items-center justify-between">
            {profileImg && (
              <>
                <button
                  // label={t("changeImage")}
                  // color="primary"
                  // className="text-capitalize"
                  onClick={chooseImage}
                  // involvTheme={themeColor}
                  className="flex justify-center items-center rounded flex space-x-2 text-blue-700  border border-indigo-900 focus:border-indigo-900 focus:outline-0
                border-indigo-900 py-1 px-3"
                >
                  Change Image
                </button>

                {isZoom && (
                  <div className="flex justify-end py-3 gap-2 items-center">
                    <ZoomOutIcon
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => handleZoomAction("-")}
                    />
                    <input
                      type="range"
                      className=" form-range w-40 h-4 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                      min={1}
                      step={0.1}
                      max={3}
                      value={zoom || 1}
                      onChange={(e) => handleZoom(e)}
                    />
                    <ZoomInIcon
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => handleZoomAction("+")}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="suggestedBg1 font-semibold text-left">
          Suggested Dimensions :&nbsp;
          <span className="font-semibold text-gray-500">
            {imageType === "banner" ? "1600*300" : "360*360"}
            {/* (aspect
            ratio 5.2:1) */}
          </span>
          <span style={{ color: "#6C7380", fontWeight: "300" }}>
            {" "}
            ( Max file size limit is 5mb ){" "}
          </span>
        </div>
      </InvolvTenantModal>
    </React.Fragment>
  );
}

export default InvolvTenantProfileUploadImg;
