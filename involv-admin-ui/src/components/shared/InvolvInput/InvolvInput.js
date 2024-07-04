import React from "react";

const InvolvInput = ({
    label="",
    name="",
    id="",
    type="",
    value="",
    placeHolder="",
    maxLength,
    disabled=false,
    setValue,
    ...rest
}) => {
    return (
        <div
            className={`relative border border-gray-300 rounded-md p-1 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 `}
            >
            <label
                htmlFor={name}
                className={`absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-gray-500 text-sm`}
            >
                {label}
            </label>

            <div className="my-1 relative rounded-md">
                <input
                    type={type || 'text'} 
                    maxLength={maxLength}
                    placeholder={placeHolder}
                    className={`w-full rounded-lg outline-0 border-0 focus:outline-none border-0 focus:border-0 border-transparent focus:border-transparent focus:ring-0` }
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e)}
                    name={name}
                    id={id}
                    {...rest}
                />
            </div>
            </div>
    )
}

export default InvolvInput;