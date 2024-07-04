import React from "react";
import moment from 'moment';

export default function InvolvOverviewSection({
    gadgetOverview,
    latestVersion,
    updatedAt
}) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3 lg:col-span-2 border-b-2 lg:border-b-0 lg:border-r-2 py-5 px-3">
        <p className="text-xl 2xl:text-2xl text-semibold mb-5">Overview</p>
        <span className="text-gray-700 text-sm">
          <div>
            <p>
            {gadgetOverview}
            </p>
          </div>
        </span>
      </div>
      <div className="col-span-3 lg:col-span-1 p-5">
        <p className="text-xl 2xl:text-2xl text-semibold mb-5">Additional Information</p>
        <p className="text-gray-700 text-sm font-semibold"> Version </p>
        <p className="text-gray-500 text-sm font-semibold"> {latestVersion} </p>
        <br />
        <p className="text-gray-700 text-sm font-semibold"> Updated </p>
        <p className="text-gray-500 text-sm font-semibold"> {moment(updatedAt).format('LL')} </p>
      </div>
    </div>
  );
}
