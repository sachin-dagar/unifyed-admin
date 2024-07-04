import React, { useState } from "react";
import { useField } from "formik";

function FloatingLabelInput({
  placeholder,
  disabled,
  id,
  height,
  addOn = false,
  ...props
}) {
  const [field] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  if (props?.type === "password") {
    return (
      <div className={`${height ? height : ""}  relative rounded`}>
        <input
          className={[
            `${
              height ? height : "h-12 "
            }  h-12 w-full border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2 `,
            disabled ? "text-gray-400" : "",
          ].join(" ")}
          {...field}
          {...props}
          id={id || props?.name}
          onFocus={props.onFocus}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
        />
        <label
          className={[
            "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
            (typeof field.value === "string" ? field.value : props.value)
              ? "text-xs px-2 -top-1 left-2 bg-white"
              : "text-sm p-2 top-1.5 left-0",
          ].join(" ")}
          htmlFor={id || props?.name}
        >
          {placeholder || props?.name}
        </label>
        {/* {field?.value && <label
          className={[
            "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
            field?.value
              ? "text-xs px-2 -top-2 left-2 bg-white"
              : "text-sm p-2 top-0 left-0"
          ].join(" ")}
          htmlFor={props?.name}
        >
          {placeholder || props?.name}
        </label>} */}
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img
              src="/images/eye-open.svg"
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <img
              src="/images/eye-close.svg"
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${height ? height : ""}  relative rounded`}>
      <input
        className={[
          `${
            height ? height : "h-12 "
          } w-full border border-gray-200  focus:ring-indigo-500 focus:border-indigo-500 rounded bg-transparent text-sm p-2 peer`,
          disabled ? "text-gray-400" : "",
        ].join(" ")}
        {...field}
        {...props}
        disabled={disabled}
        id={id || props?.name}
      />

      <label
        className={[
          "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
          (typeof field.value === "string" ? field.value : props.value)
            ? "text-xs px-2 -top-2 left-2 bg-white"
            : "text-sm p-2 top-1.5 left-0",
        ].join(" ")}
        htmlFor={id || props?.name}
      >
        {placeholder || props?.name}
      </label>
    </div>
  );
}

export default FloatingLabelInput;
