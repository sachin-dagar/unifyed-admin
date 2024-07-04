import React, { useState } from "react";
import { clock } from "../../../../AppIcons";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import { Line } from "react-chartjs-2";
import { addDays } from "date-fns";
import InvolvRangeDatepicker from "../../../shared/InvolvRangeDatepicker";

export const data = {
  labels: ["2004", "2005", "2006", "2007"],
  datasets: [
    {
      label: "Dataset 1",
      data: [750, 1170, 660, 1170],
      borderColor: "#8A72FF",
      backgroundColor: "#8A72FF",
      tension: 0.3,
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

function InvolvAverageEngageTime() {
  const [date, setDate] = useState([]);

  return (
    <InvolvAnalyticsCard>
      <div className=" flex">
        <div className="bg-blueInvolv-100 rounded-md px-6 py-5 text-blueInvolv-300">
          {clock}
        </div>
        <div className="w-full flex items-center justify-between relative">
          <h2 className="pl-3 text-xl3 font-medium leading-6">
            Average <br /> Engagement Time
          </h2>{" "}
          <InvolvRangeDatepicker
            date={date}
            setDate={setDate}
            buttonClass="border-gray-500 rounded shadow-sm text-gray-500 text-sm flex items-center"
          />
        </div>
      </div>
      <Line height="100px" options={options} data={data} />
      <div className="text-5xl font-bold text-blackInvolv-900 mt-5">
        257<span className="text-xl text-grayInvolv-200 font-normal">min</span>
      </div>
    </InvolvAnalyticsCard>
  );
}

export default InvolvAverageEngageTime;
