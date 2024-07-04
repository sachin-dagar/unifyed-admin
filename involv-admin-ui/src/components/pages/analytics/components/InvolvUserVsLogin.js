import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

export const labels = [
  { label: "User", value: 1000 },
  { label: "Login", value: 750 },
];

export const options = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "right",
    },
  },
  layouts: {},
  scales: {
    x: {
      categoryPercentage: 0.8,
      barPercentage: 0.8,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
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
      data: labels.map((item) => item.value),
      backgroundColor: ["#B884FF", "#91C2F7"],
      borderRadius: 6,
    },
  ],
};

function InvolvUsersVsLogins() {
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader title={"Users vs Logins"} />
        <div className="w-full max-h-[200px] h-full flex">
          <Bar options={options} data={data} />
        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvUsersVsLogins;
