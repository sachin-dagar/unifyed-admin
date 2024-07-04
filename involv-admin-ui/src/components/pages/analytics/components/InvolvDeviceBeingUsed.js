import { addDays } from "date-fns";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import InvolvRangeDatepicker from "../../../shared/InvolvRangeDatepicker";
// import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

export const labels = [
  { label: "Portal", color: "#42CBFF" },
  { label: "IOS", color: "#A060FF" },
  { label: "Android", color: "#48FFDA" },
];

export const data = {
  labels: labels.map((item) => item?.label),
  datasets: [
    {
      label: "# of Votes",
      data: [60, 30, 10],
      borderColor: labels.map((item) => item?.color),
      backgroundColor: labels.map((item) => item?.color),
      cutout: "60%",
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function InvolvDeviceBeingUsed() {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <div className="w-full h-full ">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader title={"Devices Being Used"} />
        <div className="relative flex items-center justify-end">
          <InvolvRangeDatepicker
            date={date}
            setDate={setDate}
            buttonClass="border-gray-500 rounded shadow-sm text-gray-500 text-sm flex items-center"
          />
        </div>
        <div className="w-1/2 relative">
          <Doughnut options={options} data={data} />
          <span className="absolute p-2 flex items-center justify-center text-center w-1/2 h-1/2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm rounded-full text-blueInvolv-800 shadow">
            Devices Used
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          {labels.map((item) => (
            <div key={item?.color} className="flex items-center gap-2">
              <div
                className="w-6 h-6 border-[1px] rounded flex items-center justify-center"
                style={{ borderColor: item?.color }}
              >
                <span
                  className="w-2 h-2 block rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></span>
              </div>
              <span className="text-blueInvolv-800">{item?.label}</span>
            </div>
          ))}
        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvDeviceBeingUsed;
