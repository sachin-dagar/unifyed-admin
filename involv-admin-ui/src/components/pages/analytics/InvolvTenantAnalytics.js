import React, { useEffect } from "react";
import { activeUser, clock } from "../../../AppIcons";
import useInvolvSocket from "../../../hooks/useInvolvSocket";
import InvolvTenantBreadcrumbs from "../../route/InvolvTenantBreadcrumbs";
import LayoutTransition from "../../shared/LayoutTransition";

//Components
import InvolvCurrentlyActiveUsers from "./components/InvolvCurrentlyActiveUsers";
import InvolvAverageEngageTime from "./components/InvolvAverageEngageTime";
import InvolvDeviceBeingUsed from "./components/InvolvDeviceBeingUsed";
import InvolvMostEngageUsers from "./components/InvolvMostEngageUsers";
import InvolvMostLikedPost from "./components/InvolvMostLikedPost";
import InvolvAllTimeData from "./components/InvolvAllTimeData";
import InvolvCompletionOfProfile from "./components/InvolvCompletionOfProfile";
import InvolvTermsOfUse from "./components/InvolvTermsOfUse";
import InvolvUsersVsLogins from "./components/InvolvUserVsLogin";
import InvolvEmailVsSms from "./components/InvolvEmailVsSms";
import InvolvMostUsedKeywords from "./components/InvolvMostUsedKeywords";
import InvolvMostUsedHashtags from "./components/InvolvMostUsedHashtags";
import InvolvHoursSpentByAspecificUser from "./components/InvolvHoursSpentByAspecificUser";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function InvolvTenantAnalytics() {
  useInvolvSocket();

  return (
    <LayoutTransition>
      <div className="flex justify-between">
        <div>
          <div className="font-medium text-grayInvolv-900 text-base 2xl:text-lg">
            Users
          </div>
          <InvolvTenantBreadcrumbs />
        </div>
      </div>
      <div className="bg-white pt-6 pb-6 px-6 rounded-md shadow mt-5 overflow-scroll">
        {/* First Raw */}
        <div className="flex mb-5">
          <div className="w-1/4">
            <InvolvCurrentlyActiveUsers />
          </div>
          <div className="w-[45%] px-4">
            <InvolvAverageEngageTime />
          </div>
          <div className="w-[30%]">
            <InvolvDeviceBeingUsed />
          </div>
        </div>

        {/* Second Raw */}
        <div className="flex mb-5">
          <div className="w-1/2">
            <InvolvMostEngageUsers />
          </div>
          <div className="w-1/2 pl-4">
            <InvolvMostEngageUsers />
          </div>
        </div>

        {/* Third Raw */}
        <div className="flex mb-5">
          <div className="w-[30%]">
            <InvolvMostLikedPost />
          </div>
          <div className="w-2/5 px-4">
            <InvolvAllTimeData />
          </div>
          <div className="grid grid-row-2 w-[30%] gap-2">
            <div className="h-full row-span-1">
              <InvolvCompletionOfProfile />
            </div>
            <div className="row-span-1">
              <InvolvTermsOfUse />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="col-span-1">
            <InvolvMostUsedKeywords />
          </div>
          <div className="col-span-1">
            <InvolvMostUsedHashtags />
          </div>
          <div className="col-span-2">
            <InvolvHoursSpentByAspecificUser />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="col-span-1">
            <InvolvUsersVsLogins />
          </div>
          <div className="col-span-1">
            <InvolvEmailVsSms />
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}

export default InvolvTenantAnalytics;
