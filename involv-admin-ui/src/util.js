import * as XLSX from "xlsx";

const TO_RADIANS = Math.PI / 180;

export const getAllModuleName = (arr) => {
  const result = [];
  function collect(array, result, activeUrlParam = "") {
    let activeUrl = activeUrlParam;
    array.forEach(function (el) {
      if (el.children) {
        let activeCurrentUrl = `${activeUrl}/${el.path}`;
        activeCurrentUrl = activeCurrentUrl?.replaceAll("//", "/");
        if (el.moduleName) {
          result.push({
            activeUrl: activeCurrentUrl,
            mouldeName: el.moduleName,
            authCheckNotRequired: el?.authCheckNotRequired || false,
          });
        }
        activeUrl = activeCurrentUrl;
        collect(el.children, result, activeUrl);
      } else if (el.moduleName) {
        let activeCurrentUrl = `${activeUrl}/${el.path}`;
        activeCurrentUrl = activeCurrentUrl?.replaceAll("//", "/");
        result.push({
          activeUrl: activeCurrentUrl,
          mouldeName: el.moduleName,
          authCheckNotRequired: el?.authCheckNotRequired || false,
        });
      }
    });
  }
  collect(arr, result);
  return result;
};

export const convertFilterString = (filter) => {
  let filterURL;
  Object.keys(filter).forEach((item) => {
    if (filter[item] !== null) {
      filterURL = `${filterURL ? filterURL + "&" : "?"}${item}=${
        filter?.[item]
      }`;
    }
  });
  return filterURL;
};

/**
 * CROP IMAGE FUNCTIONS
 */

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  ctx.globalCompositeOperation = "destination-over";

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  // return new Promise(resolve => {
  //   canvas.toBlob(file => {
  //     resolve(URL.createObjectURL(file))
  //   }, 'image/jpeg')
  // })
};

export const getCroppedImgDataURL = async (canvas) => {
  return canvas.toDataURL("image/jpeg");
};

export const getCroppedImgBlob = async (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
};

/**
 * @Author rAJENDRA
 * @desc Ageneric Function for creating the excel file from json data.
 *
 * @param {string} fileName - file name
 * @param {Array} data - data to export
 */
export const generateExcel = (fileName = "", data = []) => {
  if (data.length === 0) {
    alert("No data available to export!.");
    return;
  }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName + ".xlsx");
};

export async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}
