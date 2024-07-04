import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
// import { Chart } from "react-google-charts";
import InvolvAnalyticsCard from "../shared/InvolvAnalyticsCard";
import InvolvAnalyticsCardHeader from "../shared/InvolvAnalyticsCardHeader";

// export const data = [
//   ["Profile", "Hours per Day"],
//   ["Completed", 11],
//   ["Not Completed", 2],
// ];

// export const options = {
//   legend: { position: 'bottom', alignment: 'start' },
//   pieHole: 0.8,
//   is3D: false,
//   slices: {
//     0: { color: "#4ACC57" },
//     1: { color: "#AFAFAF" },
//   },
// };

export const profileData = [
  { label: "Completed", value: 80, color: "#4ACC57" },
  { label: "Not completed", value: 20, color: "#AFAFAF" },
];

export const data = {
  labels: profileData.map((item) => item?.label),
  datasets: [
    {
      label: "Profile",
      data: profileData.map((item) => item?.value),
      borderRadius: 100,
      cutout: "80%",
      radius: "80%",
      backgroundColor: profileData.map((item) => item?.color),
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

function InvolvCompletionOfProfile() {
  return (
    <div className="w-full h-full">
      <InvolvAnalyticsCard>
        <InvolvAnalyticsCardHeader
          title={"% Of Users Who Have Completed Their Profile"}
        />
        <div className="flex items-center">
          <div className="relative w-1/2 h-full">
            <Doughnut options={options} data={data} />
            <span className="absolute p-2 flex flex-col text-gray-500 items-center justify-center text-center w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs rounded-full">
              <h2 className="font-medium text-2xl text-blueInvolv-800">80%</h2>
              Completed
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {profileData.map((item) => (
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

export default InvolvCompletionOfProfile;
