import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function FloatingLabelInput({
  placeholder,
  disabled,
  value,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (props?.type === "password") {
    return (
      <div className="relative border rounded mb-2 border-white border-opacity-25">
        <input
          value={value}
          className={[
            "outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
            disabled ? "text-gray-400" : "",
          ].join(" ")}
          {...props}
          onFocus={props.onFocus}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          placeholder={placeholder || props?.name}
        />

        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="relative  rounded  ">
      <input
        value={value}
        className={[
          "h-12 w-full border border-gray-200   focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
          className,
          disabled ? "text-gray-400" : "",
        ].join(" ")}
        {...props}
        disabled={disabled}
        id={props?.name}
      />
      <label
        className={[
          "absolute flex items-center text-gray-800 text-opacity-80 transition-all duration-200 ease-in-out",
          value
            ? "text-xs px-2 -top-2 left-2 bg-white"
            : "text-sm p-2 top-0 left-0",
          className,
        ].join(" ")}
        htmlFor={props?.name}
      >
        {placeholder || props?.name}
      </label>
    </div>
  );
}

export default FloatingLabelInput;
