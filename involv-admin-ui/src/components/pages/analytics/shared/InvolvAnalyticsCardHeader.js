import React from "react";
// import InvolvRangeDatepicker from "../../../shared/InvolvRangeDatepicker";

function InvolvAnalyticsCardHeader({ title, RangeDatepicker, date, setDate }) {
  return (
    <div className="flex justify-between border-b pb-2 relative">
      <div className="text-blackInvolv-900 text-base 2xl:text-lg font-medium">
        {title}
      </div>
      {/* {RangeDatepicker && (
        <InvolvRangeDatepicker date={date} setDate={setDate} />
      )} */}
    </div>
  );
}

export default InvolvAnalyticsCardHeader;
