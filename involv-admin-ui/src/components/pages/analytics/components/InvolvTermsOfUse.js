import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
// import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

const touData = [
  {
    label: "Accepted",
    value: 80,
    color: "#2178BC",
  },
  {
    label: "Not Accepted",
    value: 20,
    color: "#89C6F6",
  },
];

export const data = {
  labels: touData.map((item) => item?.label),
  datasets: [
    {
      label: "Terms of use",
      data: touData.map((item) => item?.value),
      backgroundColor: touData.map((item) => item?.color),
      cutout: "80%",
      circumference: 180,
      rotation: 270,
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

function InvolvTermsOfUse() {
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader
          title={"% Of Users Who Have Accepted Terms Of Use"}
        />
        <div className="flex flex-col items-center">
          <div className="relative w-11/12 h-3/4">
            <Doughnut options={options} data={data} />
            <span className="absolute p-2 flex flex-col text-base text-gray-500 items-center justify-center text-center w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 rounded-full">
              <h2 className="font-medium text-4xl text-blueInvolv-800">80%</h2>
              Accepted Terms & Conditions
            </span>
          </div>
          <div className="flex w-full items-center justify-between">
            {touData.map((item) => (
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

export default InvolvTermsOfUse;
