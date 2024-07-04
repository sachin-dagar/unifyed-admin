import { addDays } from "date-fns";
import React, { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import InvolvRangeDatepicker from "../../../shared/InvolvRangeDatepicker";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

// export const data = [
//   ["", ""],
//   ["Email", 11],
//   ["SMS", 2],
// ];

// export const options = {
//   legend: { position: "bottom", alignment: "end" },
//   pieHole: 0.8,
//   is3D: false,
//   slices: {
//     0: { color: "#7445bb" },
//     1: { color: "#fe9e43" },
//   },
// };

export const labels = [
  { label: "Email", color: "#7445bb", value: 80 },
  { label: "SMS", color: "#fe9e43", value: 20 },
];

export const data = {
  labels: labels.map((item) => item?.label),
  datasets: [
    {
      label: "# of Votes",
      data: labels.map((item) => item?.value),
      borderRadius: 100,
      cutout: "80%",
      radius: "80%",
      backgroundColor: labels.map((item) => item?.color),
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

function InvolvEmailVsSms() {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader title={"SMS vs Email"} />
        <div className="relative flex items-center justify-end">
          <InvolvRangeDatepicker
            date={date}
            setDate={setDate}
            buttonClass="border-gray-500 rounded shadow-sm text-gray-500 text-sm flex items-center"
          />
        </div>
        <div className="flex items-center">
          <div className="relative w-1/3 h-full">
            <Doughnut options={options} data={data} />
            <span className="absolute p-2 flex flex-col text-gray-500 items-center justify-center text-center w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs rounded-full">
              <h2 className="font-medium text-2xl text-blueInvolv-800">500</h2>
              SMS vs Email
            </span>
          </div>
          <div className="flex flex-col gap-3">
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
        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvEmailVsSms;
