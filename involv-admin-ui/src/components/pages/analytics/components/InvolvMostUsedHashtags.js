import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

export const data = [
  ["Profile", "Hours per Day"],
  ["Completed", 11],
  ["Not Completed", 2],
];

export const options = {
  legend: { position: 'bottom', alignment: 'start' },
  pieHole: 0.8,
  is3D: false,
  slices: {
    0: { color: "#44CC82" },
    1: { color: "#E2E8F3" },
  },
};
function InvolvMostUsedHashtags() {

  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader
          title={"Most Used Hashtags"}
        />
        <div className="">


        </div>

      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvMostUsedHashtags;
