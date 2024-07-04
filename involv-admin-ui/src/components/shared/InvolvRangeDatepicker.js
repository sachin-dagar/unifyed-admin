import React, { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { CalendarIcon } from "../../AppIcons";
import moment from "moment";
import { isEmpty } from "lodash";
import InvolvButton from "./InvolvButton";
import { addDays } from "date-fns";

function InvolvRangeDatepicker({ buttonClass, date, setDate, icon, ...props }) {
  const [showPicker, setShowPicker] = useState(false);

  const [state, setState] = useState(
    isEmpty(date)
      ? [
          {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
          },
        ]
      : date
  );

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  const handleApply = () => {
    setDate(state);
  };

  const handleCancel = () => {
    setState(
      isEmpty(date)
        ? [
            {
              startDate: new Date(),
              endDate: addDays(new Date(), 7),
              key: "selection",
            },
          ]
        : date
    );
    setShowPicker(false);
  };

  return (
    <div className="bg-white" ref={wrapperRef}>
      <div
        className={["border p-2 flex text-grayInvolv-600", buttonClass].join(
          " "
        )}
        onClick={() => setShowPicker(!showPicker)}
      >
        <div className="pr-5">
          {moment(state[0]?.startDate).format("DD MMM YY")},{" "}
          {moment(state[0]?.endDate).format("DD MMM YY")}
        </div>
        {icon ? icon : <CalendarIcon />}
      </div>
      {showPicker && (
        <div className="bg-white absolute top-8 z-10 right-0 shadow-lg rounded border-gray-200 border flex-col flex items-end">
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            inputRanges={[]}
            months={2}
            ranges={state}
            rangeColors={["#3549d4"]}
            direction="horizontal"
            className={"flex flex-row-reverse text-lg"}
          />
          <div className="flex gap-4 p-4">
            <InvolvButton
              classes={"bg-white text-gray-500 shadow-none"}
              onClick={handleCancel}
            >
              Cancel
            </InvolvButton>
            <InvolvButton onClick={handleApply}>Apply</InvolvButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvolvRangeDatepicker;
