import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import ReactSelect from "react-select";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 20,
      min: 0,
      ticks: {
        stepSize: 5,
      },
      grid: {
        borderDash: [8, 4],
        display: true,
        drawBorder: false,
      },
    },
  },
};

export const labels = [
  { label: "" },
  { label: "2nd May", value: 10 },
  { label: "3rd May", value: 14 },
  { label: "4th May", value: 12 },
  { label: "5th May", value: 15 },
  { label: "6th May", value: 11 },
  { label: "7th May", value: 8 },
  { label: "8th May", value: 15 },
  { label: "" },
];

export const data = {
  labels: labels.map((item) => item?.label),
  datasets: [
    {
      label: "hours",
      data: labels.map((item) => item?.value),
      borderColor: "#5DD8FD",
      backgroundColor: "#5DD8FD30",
      fill: true,
    },
  ],
};

function InvolvHoursSpentByAspecificUser() {
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader title={"Hours Spent By A Specific User"} />
        <div className="flex items-center justify-end">
          <ReactSelect classNamePrefix="react_select" className="w-1/3" name="User" options={labels} />
        </div>
        <div className="">
          <Line height="100px" options={options} data={data} />
        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvHoursSpentByAspecificUser;
