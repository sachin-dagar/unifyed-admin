import React, {useRef} from "react";
import {Field} from "formik";

function InvolvSelect({ name, options=[], values, placeholder}) {
    const inputEl = useRef()
    return(
        <div className="relative border rounded mb-2 border-white border-opacity-25">
            <Field 
                name={name} 
                className={[
                    "outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
                  ].join(" ")}
                id={name} 
                innerRef={inputEl}
                component="select"
            >
                {
                    options && options.length > 0 &&
                        options.map( (opt, i) =>  <option value={opt.value} key={i}>{opt.title}</option> )
                }
            </Field>
            <label
                className={[
                    "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
                    inputEl?.current?.value
                        ? "text-xs px-2 -top-2 left-2 bg-white"
                        : "text-sm p-2 top-0 left-0",
                ].join(" ")}
                htmlFor={name}
            >
                {placeholder || name}
            </label>
        </div>
    )
}

export default InvolvSelect;