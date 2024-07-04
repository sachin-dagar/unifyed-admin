import React from "react";
import { Line } from "react-chartjs-2";
import { activeUser } from "../../../../AppIcons";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
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
        drawBorder: false,
        display: false,
      },
      ticks: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

export const data = {
  labels: ["2004", "2005", "2006", "2007", "2008", "2009", "2010"],
  datasets: [
    {
      label: "Dataset 1",
      data: [750, 670, 160, 570, 950, 275, 660],
      borderColor: "#FF59CF",
      backgroundColor: "#FF59CF",
      tension: 0.4,
    },
  ],
};

function InvolvCurrentlyActiveUsers() {
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <div className="flex">
          <div className="bg-pinkInvolv-100 rounded-md px-6 py-5 text-pinkInvolv-500">
            {activeUser}
          </div>
          <div className="w-full pl-3 text-xl3 font-medium leading-6">
            Currently Active <br /> Users
          </div>
        </div>
        <Line height="150px" options={options} data={data} />
        <div className="flex justify-between mt-5 items-center">
          <div className="text-5xl font-bold text-blackInvolv-900">257</div>
          <div className="text-greenInvolv-400 text-3xl">+0.54%</div>
        </div>
      </InvolvAnalyticsCard>
    </div>
  );
}

export default InvolvCurrentlyActiveUsers;
