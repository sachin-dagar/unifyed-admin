import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import InvolvTenantBreadcrumbBranding from "../../route/InvolvTenantBreadcrumbBranding";
import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
import LayoutTransition from "../../shared/LayoutTransition";
import InvolveBrandingChild from "./InvolveBrandingChild";

const InvolvBranding = () => {
  const [color, setColor] = useState("#3246D3");
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <LayoutTransition>
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl mb-2 font-normal">Branding</span>
            <InvolvTenantBreadcrumbBranding />
          </div>
          <div
            className="flex items-center justify-between relative bg-white w-400 py-2 px-3 shadow rounded h-12 cursor-pointer"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <div className="flex items-center">
              <div
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded-full`}
              ></div>
              <div className="text-grayInvolv-900 ml-2 text-xl2">
                Choose theme color
              </div>
            </div>
            {showColorPicker ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
            {showColorPicker && (
              <SketchPicker
                className="absolute top-14 right-0 w-263 z-20"
                color={color}
                onChange={(updateColor) => setColor(updateColor.hex)}
              />
            )}
          </div>
        </div>
      </div>
      <div onClick={() => setShowColorPicker(false)}>
        <InvolveBrandingChild color={color} setColor={setColor} />
      </div>
    </LayoutTransition>
  );
};

export default InvolvBranding;
