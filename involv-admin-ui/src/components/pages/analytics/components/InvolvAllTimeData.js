import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
// import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

export const labels = [
  { label: "Posts" },
  { label: "Comments" },
  { label: "Likes" },
  { label: "Replies" },
];

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  layouts: {},
  scales: {
    x: {
      categoryPercentage: 0.8,
      barPercentage: 0.8,
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        borderDash: [8, 4],
        display: true,
        drawBorder: false,
      },
      ticks: {
        display: true,
      },
    },
  },
};

export const data = {
  labels: labels.map((item) => item?.label),
  datasets: [
    {
      label: "Numbers",
      data: [360, 300, 484, 589],
      backgroundColor: "#5DD8FD",
      borderRadius: 6,
      // width: 10,
    },
  ],
};

function InvolvAllTimeData() {
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader title={"All Time Data"} />
        <div className="w-full max-h-[700px] h-full flex">
          <Bar options={options} data={data} />
        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvAllTimeData;
