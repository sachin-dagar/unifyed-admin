import React from "react";

const InvolvRadioInput = ({ label, id, name, handleClick, _id, checked }) => {
  return (
    <div>
      <input
        className="form-check-input appearance-none rounded-full 
                    border border-gray-300 checked:bg-indigo-900 
                    checked:border-red-600 focus:outline-none focus:border-0 transition duration-200 mt-1 
                    align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name={name}
        id={id}
        onChange={() => handleClick(_id, label)}
        checked={checked}
      />
      <label
        className="form-check-label text-sm 2xl:text-base text-gray-800"
        htmlFor={id}
      >
        {" "}
        {label}{" "}
      </label>
    </div>
  );
};

export default InvolvRadioInput;
